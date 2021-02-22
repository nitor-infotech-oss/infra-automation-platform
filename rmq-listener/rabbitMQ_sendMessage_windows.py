#!/usr/bin/env python
import pika
import ftplib, json

credentials = pika.PlainCredentials('admin', 'password')
parameters = pika.ConnectionParameters('10.11.13.146',
                                       5672,
                                       '/',
                                       credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.queue_declare(queue='sampleQueue',
                      durable='true')

details = {
    "type": "Windows",
    "url": "http://10.11.26.219/api/v2/job_templates/49/launch/",
    "params":{
        "extra_vars":
            {
             "ec2_region": "us-east-2",
             "image_id": "ami-0a83d9223efc49d62",
             "tag_name": "Windows_Server-2019",
             "to": "santoshkolekar101@gmail.com"
            }
        }
    }


channel.basic_publish(exchange='',
                      routing_key='sampleQueue',
                      body=json.dumps(details)
                      )
print("Mesaage Sent Body:")
connection.close()
'''
resp = ftplib.FTP(host="demo.wftpserver.com", user="demo", passwd="demo")
print("Connection: ", resp.__dict__)
'''

