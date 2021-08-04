import socket
import sys
from base64 import b64decode, b64encode, decodebytes, encodebytes
import struct


# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = ('127.0.0.1', 30001)
print(sys.stderr, 'starting up on %s port %s' % server_address)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)
print(sys.stderr, 'waiting for a connection')
connection, client_address = sock.accept()

while True:
    # Wait for a connection
    print('while')

    try:
        print(sys.stderr, 'connection from', client_address)

        # Receive the data in small chunks and retransmit it
        while True:
            # print(sys.stderr, 'connection from', client_address)

            # Receive the data in small chunks and retransmit it
            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Start packet "%s"' % struct.unpack('<H', data)) #
            print("=============================================")

            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'location system "%s"' % struct.unpack('<H', data)) #
            # result['locationSystem'] = str(struct.unpack('<H', data))[1:-2]
            print("=============================================")
            
            data = connection.recv(2) # number of bytes
            # print(sys.stderr, 'received "%s"' % data)
            # print(sys.stderr, 'received "%s"' % b64encode(data))
            # print(len(data))
            print(sys.stderr, 'Central Address "%s"' % struct.unpack('<H', data)) #
            # result['centralAddress'] = str(struct.unpack('<H', data))[1:-2]
            print("=============================================")

            data = connection.recv(8) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Not use "%s"' % struct.unpack('d', data)) # 
            print("=============================================")
            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Not use "%s"' % struct.unpack('<H', data)) # 
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Điện áp pin "%s"' % struct.unpack('f', data)) #
            # result['dienApPin'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Điện áp nguồn "%s"' % struct.unpack('f', data)) #
            # result['dienApNguon'] = round(float(str(struct.unpack('f', data))[1:-2]), 1) 
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Nhiệt độ thiết bị "%s"' % struct.unpack('f', data)) #
            # result['temperature'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Điện AC 3 pha "%s"' % struct.unpack('f', data)) #
            # result['dienAC3Pha'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Điện DC Point 1 "%s"' % struct.unpack('f', data)) #
            # result['dienDCPoint1'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Dòng điện DC "%s"' % struct.unpack('f', data)) #
            # result['dongDienDC'] = round(float(str(struct.unpack('f', data))[1:-2]), 1)
            print("=============================================")

            for i in range(11):
                data = connection.recv(4) # number of bytes
                # print(sys.stderr, 'received "%s"' % data)
                # print(sys.stderr, 'received "%s"' % b64encode(data))
                # print(len(data))
                # print(sys.stderr, 'Not use "%s"' % struct.unpack('f', data)) # 
                # print("=============================================")

            data = connection.recv(16) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Số điện thoại "%s"' % struct.unpack("b15s", data)[1].decode('cp1252'))
            # result['phone'] = str(struct.unpack("b15s", data)[1].decode('cp1252'))[0:-5]
            print("=============================================")

            data = connection.recv(1) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Signal Quality "%s"' % struct.unpack('b', data))
            # result['signalQuality'] = round(float(str(struct.unpack('b', data))[1:-2]), 1) 
            print("=============================================")
            if data:
                print(sys.stderr, 'sending data back to the client')
                connection.recv(len(data))
                print("END")
            else:
                print(sys.stderr, 'no more data from', client_address)
                break
            break
            
    except:
        # Clean up the connection
        print('======exception=========')
        connection.close()


