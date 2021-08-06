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

def pushDataRectifier(result):
    deviceInDb = db.RectifierTransformersDetails.find_one({
        'devSerial': result['devSerial'] 
    })
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
    else:
        db.RectifierTransformersDetails.insert_one(result)
        
    logging.info('Insert data to MongoDB')

#### Lấy dữ liệu từ bộ trung tâm ####
def getDataFromRectifier(rawData):
    logging.info('Retrieve data from central device')
    try:
        result = {}
        result['otherInfo'] = []
        subOtherInfo = {}
        subOtherInfo['time'] = datetime.datetime.now()
        try:
            # print(sys.stderr, 'connection from', client_address)
            # data = connection.recv(2) # number of bytes
            data = rawData[0:2]
            logging.info('Start packet %s' % data)   
            logging.info('length data %s' % len(data))
            logging.info('Start packet %s' % struct.unpack('<H', data))
            print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) #
            # data = connection.recv(2) # number of bytes
            data = rawData[2:4]
            logging.info('Start packet %s' % data)   
            logging.info('length data %s' % len(data))
            logging.info('location System %s' % struct.unpack('<H', data))
            subOtherInfo['locationSystem'] = str(struct.unpack('<H', data))[1:-2]
            print("rectifier")
            # data = connection.recv(2) # number of bytes
            data = rawData[4:6]
            subOtherInfo['centralAddress'] = str(struct.unpack('<H', data))[1:-2]
            # data = connection.recv(1) # number of bytes
            data = rawData[6:7]
            result['devType'] = str(struct.unpack('b', data))[1:-2]
            # data = connection.recv(4) # number of bytes
            data = rawData[7:11]
            result['devSerial'] = str(struct.unpack("2H", data)[0:-1])[1:-2]
            # print(str(struct.unpack("2H", data)[0:-1])[1:-2])
            # data = connection.recv(5) # number of bytes
            data = rawData[11:16]
            # data = connection.recv(4) # number of bytes
            data = rawData[16:20]
            subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            # data = connection.recv(4) # number of bytes
            data = rawData[20:24]
            subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            # data = connection.recv(4) # number of bytes
            data = rawData[24:28]
            subOtherInfo['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            # data = connection.recv(4) # number of bytes
            data = rawData[28:32]
            subOtherInfo['dienAC3Pha'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            print(subOtherInfo['dienAC3Pha'])
            # data = connection.recv(4) # number of bytes
            data = rawData[32:36]
            subOtherInfo['dienDCPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            # data = connection.recv(4) # number of bytes
            data = rawData[36:40]
            subOtherInfo['dongDienDC'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            for i in range(11):
                # data = connection.recv(4) # number of bytes
                data = rawData[40:84]
            # data = connection.recv(16) # number of bytes
            data = rawData[84:100]
            subOtherInfo['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]
            print(subOtherInfo['phone'])
            # data = connection.recv(1) # number of bytes
            data = rawData[100:101]
            subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 3)
            
            # data = connection.recv(1) # number of bytes
            data = rawData[101]
            print(sys.stderr, 'received last byte "%s"' % data)
            
            result['otherInfo'].append(subOtherInfo)
            logging.info('Retrieve data from tool completely')
            print('complete')
            pushDataRectifier(result)
            
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
    else:
        db.TestPostsDetails.insert_one(result)
    logging.info('Insert data to MongoDB')

def getDataFromTestPost(rawData):
    logging.info('Retrieve data from test device')
    try:
        result = {}
        result['otherInfo'] = []
        subOtherInfo = {}
        subOtherInfo['time'] = datetime.datetime.now()
        try:
            print("testpost")
            # print(sys.stderr, 'connection from', client_address)
            data = rawData[0:2] # number of bytes
            data = rawData[2:4] # number of bytes
            subOtherInfo['locationSystem'] = str(struct.unpack('<H', data))[1:-2]
            data = rawData[4:6] # number of bytes
            subOtherInfo['centralAddress'] = str(struct.unpack('<H', data))[1:-2]
            data = rawData[6:8] # number of bytes
            subOtherInfo['nodeAddress'] = str(struct.unpack('<H', data))[1:-2]
            data = rawData[8:9] # number of bytes
            result['devType'] = str(struct.unpack('b', data))[1:-2]
            data = rawData[9:13] # number of bytes
            result['devSerial'] = str(struct.unpack("2H", data)[0:-1])[1:-2]
            data = rawData[13:18] # number of bytes
            data = rawData[18:22] # number of bytes
            subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[22:26] # number of bytes
            subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[26:30] # number of bytes
            subOtherInfo['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[30:34] # number of bytes
            subOtherInfo['openPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[34:38] # number of bytes
            subOtherInfo['openPoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[38:42] # number of bytes
            subOtherInfo['openPoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[42:46] # number of bytes
            subOtherInfo['openPoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[46:50] # number of bytes
            subOtherInfo['closePoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[50:54] # number of bytes
            subOtherInfo['closePoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 3) 
            data = rawData[54:58] # number of bytes
            subOtherInfo['closePoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            data = rawData[58:62] # number of bytes
            subOtherInfo['closePoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 3)
            # for i in range(19):
            #     data = connection.recv(1) # number of bytes
            data = rawData[81:97] # number of bytes
            subOtherInfo['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]
            data = rawData[97:98] # number of bytes
            subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 3) 
            data = rawData[98:99] # number of bytes
            result['otherInfo'].append(subOtherInfo)
            logging.info('Retrieve data from tool completely')
            print('complete')
            pushDataTestPost(result)
        except Exception as e:
            print(str(e))
    
    except Exception as e:
        print(e)

def detectDevice(connection):
    data = connection.recv(120) # number of bytes
    print(len(data))
    return len(data), data

# def executeGetData():
#     while True:
#         connection = initSocket()
#         while(connection):
#             try:
#                 print('exe')
#                 lengthOfData, data = detectDevice(connection)
#                 if lengthOfData == 102:
#                     threadOne = threading.Thread(target=getDataFromRectifier, args=(data,))
#                     threadOne.daemon = True
#                     threadOne.start()
#                 elif lengthOfData == 99:
#                     threadTwo = threading.Thread(target=getDataFromTestPost, args=(data,))
#                     threadTwo.daemon = True
#                     threadTwo.start()
#                 else:
#                     print('du lieu khong phu hop hoac da ngat ket noi voi thiet bi')
#                     break
#                 # print(threading.activeCount())
#                 # print(threading.currentThread())
#             except Exception as e:
#                 logging.critical(str(e))
#                 break;

def thread_client(connection):
    while True:
        try:
            print('exe')
            lengthOfData, data = detectDevice(connection)
            if lengthOfData == 102:
                getDataFromRectifier(data)
            elif lengthOfData == 99:
                getDataFromTestPost(data)
            elif lengthOfData == 0:
                print('ngat ket noi tu device')
                break
        except Exception as e:
            logging.critical(str(e))
            break;

def executeGetData():
    print('initSocket')
    sv_address = '103.82.21.195'
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Bind the socket to the port
    server_address = (sv_address, 30001)
    print(sys.stderr, 'starting up on %s port %s' % server_address)
    sock.bind(server_address)
    sock.listen(1)
    print(sys.stderr, 'waiting for a connection')
    while True:
        connection, client_address = sock.accept()
        print(connection, client_address)
        clientThread = threading.Thread(target=thread_client, args=(connection,))
        clientThread.daemon = True
        clientThread.start()

threadExecutor = threading.Thread(target=executeGetData, args=())
threadExecutor.daemon = True
threadExecutor.start()
