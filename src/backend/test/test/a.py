import socket
import sys
from base64 import b64decode, b64encode
import struct
import threading
import logging
import datetime


# Create a TCP/IP socket
def initSocket():
    print('initSocket')
    sv_address = '127.0.0.1'
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Bind the socket to the port
    server_address = (sv_address, 30001)
    print(sys.stderr, 'starting up on %s port %s' % server_address)
    sock.bind(server_address)
    sock.listen(1)
    print(sys.stderr, 'waiting for a connection')
    
    connection, client_address = sock.accept()
    print(connection, client_address)
    return connection

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
            print(result)
            
            
        except Exception as e:
            logging.critical(e)
            logging.info('======================')
            
    except Exception as e:
        logging.critical(e)
        logging.info('======================')

def detectDevice(connection):
    data = connection.recv(120) # number of bytes
    # print(len(data))
    return len(data), data


def executeGetData():
    while True:
        connection = initSocket()
        while(connection):
            try:
                print('exe')
                lengthOfData, data = detectDevice(connection)
                if lengthOfData == 102:
                    threadOne = threading.Thread(target=getDataFromRectifier, args=(data,))
                    threadOne.daemon = True
                    threadOne.start()
                # elif lengthOfData == 99:
                #     threadTwo = threading.Thread(target=getDataFromTestPost, args=(data,))
                #     threadTwo.daemon = True
                #     threadTwo.start()
                elif lengthOfData == 0:
                    print('ngat ket noi tu device')
                    break
                # else:
                #     print(data)
                #     print(len(data))
                #     print('du lieu khong phu hop')
                #     break
                # print(threading.activeCount())
                # print(threading.currentThread())
            except Exception as e:
                logging.critical(str(e))
                break;

threadExecutor = threading.Thread(target=executeGetData, args=())
threadExecutor.daemon = True
threadExecutor.start()

print(threadExecutor)

