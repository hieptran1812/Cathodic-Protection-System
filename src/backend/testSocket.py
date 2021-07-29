# -*- coding: utf-8 -*-

import socket
import sys
from base64 import b64decode, b64encode
import struct
import json
import datetime

print('Connect to Socket')
sv_address = '103.82.21.195'
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = (sv_address, 30001)
print(sys.stderr, 'starting up on %s port %s' % server_address)
# sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
sock.bind(server_address)
sock.listen(1)
print(sys.stderr, 'waiting for a connection')

connection, client_address = sock.accept()
print(client_address)

#### Lấy dữ liệu từ bộ trung tâm ####
def getDataFromRectifier():
    print('getDataFromRectifier')
    try:
        while True:

            result = {}

            result['time'] = datetime.datetime.now()

            try:
                # print(sys.stderr, 'connection from', client_address)

                # Receive the data in small chunks and retransmit it
                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) #
                # print("=============================================")

                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'location system "%s"' % struct.unpack('<H', data)) #
                result['locationSystem'] = str(struct.unpack('<H', data))[1:-2]
                # print("=============================================")

                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Central Address "%s"' % struct.unpack('<H', data)) #
                result['centralAddress'] = str(struct.unpack('<H', data))[1:-2]
                # print("=============================================")

                data = connection.recv(1) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dev type "%s"' % struct.unpack('b', data)) #
                result['devType'] = str(struct.unpack('b', data))[1:-2]
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dev Serial "%s"' % struct.unpack("2H", data)[0:-1]) #
                result['devSerial'] = str(struct.unpack("2H", data)[0:-1])
                # print("=============================================")

                data = connection.recv(5) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Not use "%s"' % struct.unpack("b4s", data)[1]) #
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien ap pin "%s"' % struct.unpack('f', data)) #
                result['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien ap nguon "%s"' % struct.unpack('f', data)) #
                result['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 1) 
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Nhiet do thiet bi "%s"' % struct.unpack('f', data)) #
                result['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien AC 3 pha "%s"' % struct.unpack('f', data)) #
                result['dienAC3Pha'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien DC Point 1 "%s"' % struct.unpack('f', data)) #
                result['dienDCPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dong Dien DC "%s"' % struct.unpack('f', data)) #
                result['dongDienDC'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                for i in range(11):
                    data = connection.recv(4) # number of bytes
                    # print(sys.stderr, 'received "%s"' % data)
                    # print(sys.stderr, 'received "%s"' % b64encode(data))
                    # print(len(data))
                    # print(sys.stderr, 'Not use "%s"' % struct.unpack('f', data)) # 
                    # print("=============================================")

                data = connection.recv(16) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'So Dien thoại "%s"' % struct.unpack("b15s", data)[1].decode('cp1252'))
                result['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]
                # print("=============================================")

                data = connection.recv(1) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Signal Quality "%s"' % struct.unpack('b', data))
                result['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 1) 
                # print("=============================================")
                
                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                print(len(data))
                print(sys.stderr, 'test "%s"' % struct.unpack('b', data))

                return result
                
            except Exception as e:
                print("x" + str(e))
                break
    except Exception as e:
        print(e)

#### Lấy dữ liệu từ bộ đo ####

def getDataFromTestPost():
    # Create a TCP/IP socket
    # sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # # Bind the socket to the port
    # server_address = (sv_address, 30001)
    # print(sys.stderr, 'starting up on %s port %s' % server_address)
    # sock.bind(server_address)

    # # Listen for incoming connections
    # sock.listen(1)
    print('getDataFromTestPost')
    try:
        while True:
            # Wait for a connection
            # print(sys.stderr, 'waiting for a connection')
            # connection, client_address = sock.accept()

            result = {}

            result['time'] = datetime.datetime.now()

            try:
                # print(sys.stderr, 'connection from', client_address)

                # Receive the data in small chunks and retransmit it
                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) # 
                # print("=============================================")

                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'location system "%s"' % struct.unpack('<H', data)) # 
                result['locationSystem'] = str(struct.unpack('<H', data))[1:-2]
                # print("=============================================")

                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Central Address "%s"' % struct.unpack('<H', data)) # 
                result['centralAddress'] = str(struct.unpack('<H', data))[1:-2]
                # print("=============================================")

                data = connection.recv(2) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Node Address "%s"' % struct.unpack('<H', data)) #
                result['nodeAddress'] = str(struct.unpack('<H', data))[1:-2]
                # print("=============================================")

                data = connection.recv(1) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                print(sys.stderr, 'Dev type "%s"' % struct.unpack('b', data)) #
                result['devType'] = str(struct.unpack('b', data))[1:-2]
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                print(len(data))
                print(sys.stderr, 'Dev Serial "%s"' % struct.unpack("2H", data)[0:-1]) #
                result['devSerial'] = str(struct.unpack("2H", data)[0:-1])
                # print("=============================================")

                data = connection.recv(5) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Not use "%s"' % struct.unpack('<H', data)) # 
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien ap pin "%s"' % struct.unpack('f', data)) #
                result['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Dien ap nguồn "%s"' % struct.unpack('f', data)) #
                result['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Nhiet do thiet bi "%s"' % struct.unpack('f', data)) #
                result['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Open Point 1 "%s"' % struct.unpack('f', data)) #
                result['openPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Open Point 2 "%s"' % struct.unpack('f', data)) #
                result['openPoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Open Point 3 "%s"' % struct.unpack('f', data)) #
                result['openPoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Open Point 4 "%s"' % struct.unpack('f', data)) #
                result['openPoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Close Point 1 "%s"' % struct.unpack('f', data)) #
                result['closePoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Close Point 2 "%s"' % struct.unpack('f', data)) #
                result['closePoint2'] = round(float(str(struct.unpack('f', data))[1:-2]), 1) 
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Close Point 3 "%s"' % struct.unpack('f', data)) #
                result['closePoint3'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Close Point 4 "%s"' % struct.unpack('f', data)) #
                result['closePoint4'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
                # print("=============================================")

                for i in range(19):
                    data = connection.recv(1) # number of bytes
                    # print(sys.stderr, 'received "%s"' % data)
                    # print(sys.stderr, 'received "%s"' % b64encode(data))
                    # print(len(data))
                    # print(sys.stderr, 'Not use "%s"' % struct.unpack('s', data)) # 
                    # print("=============================================")

                data = connection.recv(16) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'So Dien thoại "%s"' % struct.unpack("b15s", data)[1].decode('cp1252'))
                result['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]
                # print("=============================================")

                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                print(len(data))
                # print(sys.stderr, 'Signal Quality "%s"' % struct.unpack('b', data))
                result['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 1) 
                # print("=============================================")

                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                print(len(data))
                print(sys.stderr, 'test "%s"' % struct.unpack('b', data))

                # result = json.dumps(result)
                print(type(result))

                data = connection.recv(1) # number of bytes
                print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                print(len(data))
                print(sys.stderr, 'test "%s"' % struct.unpack('b', data))

                return result

            except Exception as e:
                print("x" + str(e))
                break
    
    except Exception as e:
        print(e)


# getDataFromRectifier()
# getDataFromTestPost()



