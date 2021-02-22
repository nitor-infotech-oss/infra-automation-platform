#!/usr/bin/env python
import pika

import requests
import json
from requests.auth import HTTPBasicAuth


credentials = pika.PlainCredentials('admin', 'password')
parameters = pika.ConnectionParameters('10.11.13.146',
                                       5672,
                                       '/',
                                       credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.queue_declare(queue='sampleQueue',
                      durable='true')


def trigger_awx_job(deatilsObj):
  hostname = "10.11.26.219"
  user = "admin"
  password = "password"
  url = 'http://10.11.26.219/api/v2/job_templates/'

  headers={
        'Server': 'nginx',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Vary': 'Accept, Accept-Language, Origin, Cookie',
        'Allow': 'GET, POST, HEAD, OPTIONS',
        'X-API-Product-Version': '11.2.0',
        'X-API-Product-Name': 'AWX',
        'Content-Language': 'en',
        'url': deatilsObj['url']
        }
  data = deatilsObj['params']
  lounch_url = deatilsObj['url']
  resp = requests.post(lounch_url, auth=HTTPBasicAuth(user, password), data=json.dumps(data), headers=headers)
  print(resp.status_code)
  print(resp.__dict__)

def callback(ch, method, properties, body):
    # print(" [x] %r" % body)
    try:
        print(str(body))
        detailsObj = json.loads(str(body).replace("b'","").replace("'",""))
        #data = deatilsObj['params']
        #lounch_url = deatilsObj['url']

        trigger_awx_job(detailsObj)
        print('Succefully Created')
    except Exception as e:
        print("Error while Creating:",e)


channel.basic_consume(
    queue='sampleQueue', on_message_callback=callback, auto_ack=True)

channel.start_consuming()
