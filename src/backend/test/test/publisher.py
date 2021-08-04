# publisher
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect('localhost', 5000)

while True:
    client.publish("LINTANGtopic/test", input('Message : '))