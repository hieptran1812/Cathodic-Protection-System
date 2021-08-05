# -*- coding: utf-8 -*-

import socket
import sys
from base64 import b64decode, b64encode
import struct
import json
import datetime
import logging
logging.basicConfig(filename='log_testSocket.log', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.DEBUG)
import threading
from flask_pymongo import pymongo
from configDB import db

logging.info('Connect to Socket')
sv_address = '127.0.0.1'
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = (sv_address, 30001)
logging.info('starting up on %s port %s' % server_address)
# sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
sock.bind(server_address)
sock.listen(1024)
logging.info('waiting for a connection')

connection, client_address = sock.accept()
logging.info('connect to %s port %s' % server_address)

def pushDataRectifier(result):
    deviceInDb = db.RectifierTransformersDetails.find_one({
        'devSerial': result['devSerial'] 
    })
    # print(result['devSerial'])
    if deviceInDb:
        db.RectifierTransformersDetails.update(
            {'devSerial': result['devSerial']},
            {
                "$push": {
                    "otherInfo": {
                        "$each": [result['otherInfo'][0]],
                        "$position": 0
                    }
                }
            }
        )
        # print('1') 
    else:
        db.RectifierTransformersDetails.insert_one(result)
        # print('0')
        
    logging.info('Insert data to MongoDB')

#### Lấy dữ liệu từ bộ trung tâm ####
def getDataFromRectifier():
    logging.info('Retrieve data from central device')
    try:
        while True:
            result = {}
            result['otherInfo'] = []
            subOtherInfo = {}
            subOtherInfo['time'] = datetime.datetime.now()
            try:
                print('1')
                # print(sys.stderr, 'connection from', client_address)
                data = connection.recv(2) # number of bytes
                logging.info('Start packet %s' % data)   
                logging.info('length data %s' % len(data))
                logging.info('Start packet %s' % struct.unpack('<H', data))

                print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) #

                data = connection.recv(2) # number of bytes
                logging.info('Start packet %s' % data)   
                logging.info('length data %s' % len(data))
                logging.info('location System %s' % struct.unpack('<H', data))
                subOtherInfo['locationSystem'] = str(struct.unpack('<H', data))[1:-2]

                data = connection.recv(2) # number of bytes
                subOtherInfo['centralAddress'] = str(struct.unpack('<H', data))[1:-2]

                data = connection.recv(1) # number of bytes
                result['devType'] = str(struct.unpack('b', data))[1:-2]

                data = connection.recv(4) # number of bytes
                result['devSerial'] = str(struct.unpack("2H", data)[0:-1])[1:-2]
                # print(str(struct.unpack("2H", data)[0:-1])[1:-2])
                data = connection.recv(5) # number of bytes

                data = connection.recv(4) # number of bytes
                subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                subOtherInfo['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                subOtherInfo['dienAC3Pha'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                subOtherInfo['dienDCPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                subOtherInfo['dongDienDC'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                for i in range(11):
                    data = connection.recv(4) # number of bytes

                data = connection.recv(16) # number of bytes
                subOtherInfo['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]

                data = connection.recv(1) # number of bytes
                subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 3)
                
                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'received last byte "%s"' % data)
                
                result['otherInfo'].append(subOtherInfo)

                logging.info('Retrieve data from tool completely')
                print('complete')

                pushDataRectifier(result)

                return
                
            except Exception as e:
                logging.critical(e)
                logging.info('======================')
                
    except Exception as e:
        logging.critical(e)
        logging.info('======================')

#### Lấy dữ liệu từ bộ đo ####

def pushDataTestPost(result):
    deviceInDb = db.TestPostsDetails.find_one({
        'devSerial': result['devSerial'] 
    })
    # print(result['devSerial'])
    if deviceInDb:
        db.TestPostsDetails.update(
            {'devSerial': result['devSerial']},
            {
                "$push": {
                    "otherInfo": {
                        "$each": [result['otherInfo'][0]],
                        "$position": 0
                    }
                }
            }
        )
        # print('1') 
    else:
        db.TestPostsDetails.insert_one(result)
        # print('0')
        
    logging.info('Insert data to MongoDB')

def getDataFromTestPost():
    logging.info('Retrieve data from test device')
    try:
        while True:

            result = {}
            result['otherInfo'] = []
            subOtherInfo = {}
            subOtherInfo['time'] = datetime.datetime.now()

            try:
                # print(sys.stderr, 'connection from', client_address)
                
                data = connection.recv(2) # number of bytes
                logging.debug('')
                print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) # 

                data = connection.recv(2) # number of bytes
                print(sys.stderr, 'location system "%s"' % struct.unpack('<H', data)) # 
                subOtherInfo['locationSystem'] = str(struct.unpack('<H', data))[1:-2]

                data = connection.recv(2) # number of bytes
                print(sys.stderr, 'Central Address "%s"' % struct.unpack('<H', data)) # 
                subOtherInfo['centralAddress'] = str(struct.unpack('<H', data))[1:-2]

                data = connection.recv(2) # number of bytes
                print(sys.stderr, 'Node Address "%s"' % struct.unpack('<H', data)) #
                subOtherInfo['nodeAddress'] = str(struct.unpack('<H', data))[1:-2]

                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'Dev type "%s"' % struct.unpack('b', data)) #
                result['devType'] = str(struct.unpack('b', data))[1:-2]

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Dev Serial "%s"' % struct.unpack("2H", data)[0:-1]) #
                result['devSerial'] = str(struct.unpack("2H", data)[0:-1])[1:-2]

                data = connection.recv(5) # number of bytes

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Dien ap pin "%s"' % struct.unpack('f', data)) #
                subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Dien ap nguồn "%s"' % struct.unpack('f', data)) #
                subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Nhiet do thiet bi "%s"' % struct.unpack('f', data)) #
                subOtherInfo['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Open Point 1 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['openPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Open Point 2 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['openPoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Open Point 3 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['openPoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Open Point 4 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['openPoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Close Point 1 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['closePoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Close Point 2 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['closePoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 3) 

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Close Point 3 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['closePoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'Close Point 4 "%s"' % struct.unpack('f', data)) #
                subOtherInfo['closePoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)

                for i in range(19):
                    data = connection.recv(1) # number of bytes

                data = connection.recv(16) # number of bytes
                print(sys.stderr, 'So Dien thoại "%s"' % struct.unpack("b15s", data)[1].decode('cp1252'))
                subOtherInfo['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]

                data = connection.recv(1) # number of bytes
                subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 3) 

                data = connection.recv(1) # number of bytes
                print(len(data))
                print(sys.stderr, 'test1 "%s"' % struct.unpack('b', data))

                result['otherInfo'].append(subOtherInfo)

                logging.info('Retrieve data from tool completely')
                print('complete')

                pushDataTestPost(result)

                return

            except Exception as e:
                print(str(e))
                break
    
    except Exception as e:
        print(e)

# try:
#     threading._start_new_thread(getDataFromRectifier, ())
#     # threading._start_new_thread(getDataFromTestPost, ())
# except Exception as e:
#     logging.critical(str(e))
# while (connection):

#     getDataFromRectifier()
