from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User, Ticket
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token
from sqlalchemy.ext.serializer import loads, dumps
import jwt
from .rabbitmq.enqueue_ticket import EnqueueTicket

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        name=incoming["name"],
        email=incoming["email"],
        password=incoming["password"].encode('utf-8')
    )
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409
    new_user = User.query.filter_by(email=incoming["email"]).first()
    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/getToken", methods=["POST"])
def getToken():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"].encode('utf-8'))
    if user:
        return jsonify(token=generate_token(user))
    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])
    if is_valid:
        return jsonify(token_is_valid=True, id=22)
    else:
        return jsonify(token_is_valid=False), 403


@app.route("/api/create_ticket", methods=["POST"])
def create_ticket():
    incoming = request.get_json()
    user = payload = jwt.decode(incoming['token'], app.config.get('SECRET_KEY'))
    issued_by = user['id']
    ticketType = 'VM Creation'
    if 'type' in incoming.keys():
        if (incoming['type'] == 'Storage Provision'):
            ticketType = 'Storage Provision'
    assigned_to = 2
    if (incoming['envSelectedValue'] == "On Premise"):
        incoming['platformValue'] = "On Premise"
    ticket = Ticket(envoiroment=incoming['envSelectedValue'], os=incoming['OSelectedValue'], platform=incoming['platformValue'], instance_type=incoming['instanceType'], region=incoming['region'], instance_name=incoming['instanceName'], machine_username=incoming['machineUsername'], ram_size=incoming['ramSize'], storage_size=incoming['storageSize'], status='Pending', assigned_to=assigned_to, issued_by=issued_by, type=ticketType, description=incoming['description'])
    db.session.add(ticket)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Failed to create Ticket"), 500
    return jsonify(message="New Ticket SuccessFully Created"), 200

def build_specs(t):
    if (t.platform=='AWS'):
        spec = t.platform + ', '+ t.os + ', '+ t.instance_type
    elif (t.platform=='On Premise'):
        spec = t.platform + ', '+ t.os + ', '+ t.ram_size + 'GB RAM, '+ t.storage_size + 'GB HDD'
    elif (t.platform=='Azure'):
        spec = t.platform + ', '+ t.os + ', '+ t.machine_username
    obj = {
        "ID": t.id,
        "description": t.description,
        "type": t.type,
        "issuedBy": User.name_by_id(t.issued_by),
        "assignedTo": User.name_by_id(t.assigned_to),
        "specs": spec,
        "status": t.status
    }
    return obj


@app.route("/api/get_tickets", methods=["GET"])
@requires_auth
def get_tickets():
    import json
    data = []
    user = payload = jwt.decode(request.environ['HTTP_AUTHORIZATION'], app.config.get('SECRET_KEY'))
    tickets = Ticket.get_assigned_tickets(user['id'])
    for t in tickets:
        obj = build_specs(t)
        data.append(obj)
    return jsonify(result=data)

@app.route("/api/get_my_tickets", methods=["GET"])
@requires_auth
def get_my_tickets():
    import json
    tickets = Ticket.query.all()
    data = []
    user = payload = jwt.decode(request.environ['HTTP_AUTHORIZATION'], app.config.get('SECRET_KEY'))
    tickets = Ticket.get_my_tickets(str(user['id']))
    for t in tickets:
        obj = build_specs(t)
        data.append(obj)
    return jsonify(result=data)


@app.route("/api/get_all_tickets", methods=["GET"])
@requires_auth
def get_all_tickets():
    import json
    tickets = Ticket.query.all()
    data = []
    user = payload = jwt.decode(request.environ['HTTP_AUTHORIZATION'], app.config.get('SECRET_KEY'))
    tickets = Ticket.get_approved_tickets(user['id'])
    for t in tickets:
        obj = build_specs(t)
        data.append(obj)
    return jsonify(result=data)


@app.route("/api/approve_ticket", methods=["POST"])
def approve_ticket():
    incoming = request.get_json()
    tickets_array = []
    if (isinstance(incoming['ticketIDs'], str)):
        tickets_array.append(incoming['ticketIDs'])
    else:
        tickets_array = incoming['ticketIDs']
    print("==="*30)
    print(type(incoming['ticketIDs']))
    print(tickets_array)
    print("==="*30)
    newticks = Ticket.id.in_(incoming['ticketIDs'])
    tickets_obj_array = Ticket.query.filter(Ticket.id.in_(tickets_array)).all()
    try:
        EnqueueTicket(tickets_obj_array)
    except IntegrityError:
        return jsonify(message="Failed to approve Ticket"), 409
    return jsonify(message="New Ticket SuccessFully Approved"), 200
