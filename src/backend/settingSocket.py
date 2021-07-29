import socket
import sys

# connection = None
# client_address = None

print('SettingSocket')

def initSocket():
    print('initSocket')
    sv_address = '103.82.21.195'
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Bind the socket to the port
    server_address = (sv_address, 30001)
    print(sys.stderr, 'starting up on %s port %s' % server_address)
    sock.bind(server_address)
    sock.listen(1)
    print(sys.stderr, 'waiting for a connection')
    # global connection
    # global client_address
    
    connection, client_address = sock.accept()
    print(connection, client_address)
    return connection, client_address
