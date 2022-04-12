# -*- coding: utf-8 -*-

import socket
import sys
from base64 import b64decode, b64encode
import struct
import json
import datetime
import logging
logging.basicConfig(filename='pushData.log', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.DEBUG)
import threading
from flask_pymongo import pymongo
from configDB import db


def pushDataRectifier(result):
    deviceInDb = db.RectifierTransformersDetails.find_one({
        'devSerial': result['devSerial'] 
    })
    print('Tinh toan Effciency')
    result['otherInfo'][0]['efficiency'] = round(result['otherInfo'][0]['efficiency']/float(deviceInDb['ACInputPower']),3)
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
        # db.RectifierTransformersDetails.insert_one(result)
        print('nhan du lieu tu thiet bi Bo trung tam chua duoc them tren he thong')

    print('Insert data to MongoDB')

#### Lấy dữ liệu từ bộ trung tâm ####
def getDataFromRectifier(rawData):
    print('Retrieve data from central device')
    try:
        result = {}
        result['otherInfo'] = []
        subOtherInfo = {}
        subOtherInfo['time'] = datetime.datetime.now()
        try:
            print("======rectifier=======")
            # print(sys.stderr, 'connection from', client_address)
            print('Start packet %s' % rawData[0:2])   
            print('length data %s' % len(rawData[0:2]))
            print('Start packet %s' % struct.unpack('<H', rawData[0:2]))
            print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', rawData[0:2])) #
            print('Start packet %s' % rawData[2:4])   
            print('length data %s' % len(rawData[2:4]))
            print('location System %s' % struct.unpack('<H', rawData[2:4]))
            subOtherInfo['locationSystem'] = str(struct.unpack('<H', rawData[2:4]))[1:-2]
            subOtherInfo['centralAddress'] = str(struct.unpack('<H', rawData[4:6]))[1:-2]
            result['devType'] = str(struct.unpack('b', rawData[6:7]))[1:-2]
            result['devSerial'] = str(struct.unpack("2H", rawData[7:11])[0:-1])[1:-2]
            print('Ma thiet bi bo trung tam: %s', result['devSerial'])
            subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', rawData[16:20]))[1:-2]), 3)
            print('dienApPin', subOtherInfo['dienApPin'])
            subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', rawData[20:24]))[1:-2]), 3)
            print('dienApNguon', subOtherInfo['dienApNguon'])
            subOtherInfo['temperature'] = round(float(str(struct.unpack('f', rawData[24:28]))[1:-2]), 3)
            print('temperature', subOtherInfo['temperature'])
            subOtherInfo['dienAC3PhaA'] = round(float(str(struct.unpack('f', rawData[28:32]))[1:-2]), 3)
            print('dienAC3PhaA', subOtherInfo['dienAC3PhaA'])
            subOtherInfo['dienAC3PhaB'] = round(float(str(struct.unpack('f', rawData[32:36]))[1:-2]), 3)
            print('dienAC3PhaB', subOtherInfo['dienAC3PhaB'])
            subOtherInfo['dienAC3PhaC'] = round(float(str(struct.unpack('f', rawData[36:40]))[1:-2]), 3)
            print('dienAC3PhaC', subOtherInfo['dienAC3PhaC'])
            subOtherInfo['dienDCPoint1'] = round(float(str(struct.unpack('f', rawData[40:44]))[1:-2]), 3)
            print('dienDCPoint1', subOtherInfo['dienDCPoint1'])
            subOtherInfo['dongDienDC'] = round(float(str(struct.unpack('f', rawData[44:48]))[1:-2]), 3)
            print('dongDienDC', subOtherInfo['dongDienDC'])

            # Ma thiet bi dang chuoi tu bo trung tam
            subOtherInfo['maChuoi'] = str(struct.unpack("b36s", rawData[47:84])[1].decode('cp1252'))[0:-5]
            print('Ma thiet bi dang chuoi %s', subOtherInfo['maChuoi'])

            subOtherInfo['phone'] = str(struct.unpack("b15s", rawData[84:100])[1].decode('cp1252'))[0:-5]
            print(subOtherInfo['phone'])
            subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', rawData[100:101]))[1:-2]), 3)
            # subOtherInfo['ACInputPower'] = round(subOtherInfo['dienDCPoint1']*subOtherInfo['dongDienDC'],3)
            if(float(subOtherInfo['dongDienDC'])):
                subOtherInfo['resistance'] = round(float(subOtherInfo['dienDCPoint1'])/float(subOtherInfo['dongDienDC']), 3)
            else:
                subOtherInfo['resistance'] = "NA"
            subOtherInfo['efficiency'] = round(float(subOtherInfo['dienDCPoint1'])*float(subOtherInfo['dongDienDC']),3)
            data = rawData[101]
            print(sys.stderr, 'received last byte "%s"' % data)
            
            result['otherInfo'].append(subOtherInfo)
            print('Retrieve data from tool completely')
            print('complete rectifier')
            pushDataRectifier(result)
            print('push data to db complete')
            
        except Exception as e:
            logging.critical(e)
            print('======================')
            
    except Exception as e:
        logging.critical(e)
        print('======================')

#### Lấy dữ liệu từ bộ đo ####

def pushDataTestPost(result):
    deviceInDb = db.TestPostsDetails.find_one({
        'devSerial': result['devSerial'] 
    })
    
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
        # db.TestPostsDetails.insert_one(result)
        logging.info(f"nhan du lieu tu thiet bi moi chua duoc them tren he thong")
    print('Insert data to MongoDB')

def getDataFromTestPost(rawData):
    print('Retrieve data from test device')
    try:
        result = {}
        result['otherInfo'] = []
        subOtherInfo = {}
        subOtherInfo['time'] = datetime.datetime.now()
        try:
            print("==========testpost=========")
            # print(sys.stderr, 'connection from', client_address)
            subOtherInfo['locationSystem'] = str(struct.unpack('<H', rawData[2:4]))[1:-2]
            print('Location system', subOtherInfo['locationSystem'])
            subOtherInfo['centralAddress'] = str(struct.unpack('<H', rawData[4:6]))[1:-2]
            print('centralAddress', subOtherInfo['centralAddress'])
            subOtherInfo['nodeAddress'] = str(struct.unpack('<H', rawData[6:8]))[1:-2]
            print('nodeAddress', subOtherInfo['nodeAddress'])
            result['devType'] = str(struct.unpack('b', rawData[8:9]))[1:-2]
            print('devType', result['devType'])
            result['devSerial'] = str(struct.unpack("2H", rawData[9:13])[0:-1])[1:-2]
            print('Ma thiet bi bo do: %s', result['devSerial'])
            subOtherInfo['dienApPin'] = round(float(str(struct.unpack('f', rawData[18:22]))[1:-2]), 3)
            print('dienApPin', subOtherInfo['dienApPin'])
            subOtherInfo['dienApNguon'] = round(float(str(struct.unpack('f', rawData[22:26]))[1:-2]), 3)
            print('dienApNguon', subOtherInfo['dienApNguon'])
            subOtherInfo['temperature'] = round(float(str(struct.unpack('f', rawData[26:30]))[1:-2]), 3)
            print('temperature', subOtherInfo['temperature'])
            subOtherInfo['openPoint1'] = round(float(str(struct.unpack('f', rawData[30:34]))[1:-2]), 3)
            print('openPoint1', subOtherInfo['openPoint1'])
            subOtherInfo['openPoint2'] = round(float(str(struct.unpack('f', rawData[34:38]))[1:-2]), 3)
            print('openPoint2', subOtherInfo['openPoint2'])
            subOtherInfo['openPoint3'] = round(float(str(struct.unpack('f', rawData[38:42]))[1:-2]), 3)
            print('openPoint3', subOtherInfo['openPoint3'])
            subOtherInfo['openPoint4'] = round(float(str(struct.unpack('f', rawData[42:46]))[1:-2]), 3)
            print('openPoint4', subOtherInfo['openPoint4'])
            subOtherInfo['closePoint1'] = round(float(str(struct.unpack('f', rawData[46:50]))[1:-2]), 3)
            print('closePoint1', subOtherInfo['closePoint1'])
            subOtherInfo['closePoint2'] = round(float(str(struct.unpack('f', rawData[50:54]))[1:-2]), 3) 
            print('closePoint2', subOtherInfo['closePoint2'])
            subOtherInfo['closePoint3'] = round(float(str(struct.unpack('f', rawData[54:58]))[1:-2]), 3)
            print('closePoint3', subOtherInfo['closePoint3'])
            subOtherInfo['closePoint4'] = round(float(str(struct.unpack('f', rawData[58:62]))[1:-2]), 3)
            print('closePoint4', subOtherInfo['closePoint4'])

            # Ma thiet bi dang chuoi
            subOtherInfo['maChuoi'] = str(struct.unpack("b19s", rawData[62:82])[1].decode('cp1252'))[0:-5]
            print('Ma thiet bi dang chuoi dang chay %s', subOtherInfo['maChuoi'])

            subOtherInfo['phone'] = str(struct.unpack("b15s", rawData[81:97])[1].decode('cp1252'))[0:-5]
            subOtherInfo['signalQuality'] = round(float(str(struct.unpack('b', rawData[97:98]))[1:-2]), 3) 
            result['otherInfo'].append(subOtherInfo)
            print('Retrieve data from tool completely')
            print('complete testpost')
            pushDataTestPost(result)
        except Exception as e:
            print(str(e))
    
    except Exception as e:
        print(e)

def detectDevice(connection):
    data = connection.recv(120) # number of bytes
    print(len(data))
    return len(data), data

def thread_client(connection):
    while True:
        try:
            lengthOfData, data = detectDevice(connection)
            print('Do dai ban tin %s', lengthOfData)
            if lengthOfData == 102:
                getDataFromRectifier(data)
            elif lengthOfData == 99:
                getDataFromTestPost(data)
            elif lengthOfData == 0:
                break
        except Exception as e:
            logging.critical(str(e))
            break;

def executeGetData():
    print('initSocket')
    sv_address = '103.166.183.195'
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
