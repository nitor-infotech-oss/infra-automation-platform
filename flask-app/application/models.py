from index import db, bcrypt
import uuid
import jwt

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    name = db.Column(db.String(255))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    @staticmethod
    def name_by_id(id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return None
        return user.name


class Ticket(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    ticket_id = db.Column(db.String(255), unique=True)
    envoiroment = db.Column(db.String(255))
    os = db.Column(db.String(255))
    platform = db.Column(db.String(255))
    instance_type = db.Column(db.String(255))
    region = db.Column(db.String(255))
    instance_name = db.Column(db.String(255))
    machine_username = db.Column(db.String(255))
    ram_size = db.Column(db.String(255))
    storage_size = db.Column(db.String(255))
    assigned_to = db.Column(db.String(255))
    status = db.Column(db.String(255))
    issued_by = db.Column(db.String(255))
    type = db.Column(db.String(255))
    description = db.Column(db.String(255))

    def __init__(self, envoiroment, os, platform, instance_type, region, instance_name, machine_username, ram_size, storage_size, assigned_to, issued_by, status, description, type):
        self.ticket_id = str(uuid.uuid4())
        self.envoiroment = envoiroment
        self.instance_name = instance_name
        self.os = os
        self.platform = platform
        self.instance_type = instance_type
        self.region = region
        self.machine_username = machine_username
        self.ram_size = ram_size
        self.storage_size = storage_size
        self.assigned_to = assigned_to
        self.issued_by = issued_by
        self.status = status
        self.type = type
        self.description = description

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_approved_tickets(user_id):
        tickets = Ticket.query.filter_by(status="Approved")
        return tickets

    @staticmethod
    def get_assigned_tickets(user_id):
        tickets = Ticket.query.filter_by(assigned_to=user_id, status="Pending")
        return tickets

    @staticmethod
    def get_my_tickets(user_id):
        tickets = Ticket.query.filter_by(issued_by=user_id)
        return tickets
