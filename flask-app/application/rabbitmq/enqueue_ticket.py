import pika
import ftplib, json
import application.rabbitmq.config as cfg
from ..models import User, Ticket
from .email_handler import EmailHandler
from index import app, db

class EnqueueTicket():
    def __init__(self, ticketsArray):
        self.ticketsArray = ticketsArray
        self.username     = 'admin'
        self.password     = 'password'
        self.url          = '10.11.13.146'
        self.port         = 5672
        self.connection   = self.connect()
        self.channel      = self.get_channel()
        self.approve_ticket_by_ticket()
        self.close()

    def approve_ticket_by_ticket(self):
        for ticket in self.ticketsArray:
            details_obj       = self.build_details_obj(ticket)
            user = User.query.filter_by(id=ticket.issued_by).first()
            details_obj['params']['extra_vars']['to'] = user.email
            self.publish(details_obj)
            EmailHandler(user.email)
            ticket.status = "Approved"
            db.session.commit()


    def connect(self):
        credentials = pika.PlainCredentials(self.username, self.password)
        parameters  = pika.ConnectionParameters(self.url,
                                               self.port,
                                               '/',
                                               credentials)
        connection  = pika.BlockingConnection(parameters)
        return connection


    def get_channel(self):
        channel = self.connection.channel()
        channel.queue_declare(queue='sampleQueue',
                              durable='true')
        return channel

    def publish(self, details):
        self.channel.basic_publish(exchange='',
                              routing_key='sampleQueue',
                              body=json.dumps(details)
                              )

        print(details)
        print("Mesaage Sent Body:")

    def close(self):
        self.connection.close()

    def set_gcp_params(self, details_obj, ticket):
        return details_obj

    def set_aws_params(self, details_obj, ticket):
        return details_obj

    def set_azure_params(self, details_obj, ticket):
        return details_obj

    def set_onprem_params(self, details_obj, ticket):
        return details_obj

    def build_details_obj(self, ticket):
        if (ticket.type == "Storage Provision"):
            det_obj = self.build_storage_provision_params(ticket)
            return det_obj
        details_obj = cfg.PARAMETER_DETAILS[ticket.platform][ticket.os]
        if (ticket.platform == "AWS"):
            details_obj = self.set_aws_params(details_obj, ticket)
        elif (ticket.platform == "GCP"):
            details_obj = self.set_gcp_params(details_obj, ticket)
        elif (ticket.platform == "Azure"):
            details_obj = self.set_azure_params(details_obj, ticket)
        elif (ticket.platform == "On Premise"):
            details_obj = self.set_onprem_params(details_obj, ticket)
        return details_obj

    def build_storage_provision_params(self, ticket):
        details_obj = cfg.STORAGE_PARAMETER_DETAILS[ticket.platform]
        if (ticket.platform == "Azure"):
            details_obj['params']['resource_group'] = ticket.instance_name
        if (ticket.platform == "AWS"):
            details_obj['params']['name'] = ticket.instance_name
        return details_obj
