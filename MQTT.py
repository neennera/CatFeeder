import paho.mqtt.client as paho
import paho.mqtt.publish as publish
import time

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    s=(str(msg.payload))
    print(s)

client = paho.Client()

client.on_subscribe = on_subscribe
client.on_message = on_message
client.connect("broker.mqttdashboard.com", 1883)
client.subscribe("palmmmm", qos=1)

client.loop_forever()