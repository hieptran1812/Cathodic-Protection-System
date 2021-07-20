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

while True:
    # Wait for a connection
    print(sys.stderr, 'waiting for a connection')
    connection, client_address = sock.accept()

    try:
        print(sys.stderr, 'connection from', client_address)

        # Receive the data in small chunks and retransmit it
        while True:
            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'received "%s"' % struct.unpack('<H', data)) # 
            print("=============================================")

            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'location system "%s"' % struct.unpack('<H', data)) # 
            print("=============================================")

            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Central Address "%s"' % struct.unpack('<H', data)) # 
            print("=============================================")

            data = connection.recv(2) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Nodes Address "%s"' % struct.unpack('<H', data)) # 
            print("=============================================")

            data = connection.recv(8) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print("=============================================")

            data = connection.recv(4) # number of bytes
            print(sys.stderr, 'received "%s"' % data)
            print(sys.stderr, 'received "%s"' % b64encode(data))
            print(len(data))
            print(sys.stderr, 'Dien Ap Pin "%s"' % struct.unpack('f', data)) # 
            print("=============================================")
            if data:
                print(sys.stderr, 'sending data back to the client')
                connection.sendall(data)
            else:
                print(sys.stderr, 'no more data from', client_address)
                break
            
    finally:
        # Clean up the connection
        connection.close()

