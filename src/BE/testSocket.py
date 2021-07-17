import socket
host = '127.0.0.1'
port = 2
s = socket.socket()
s.bind((host, port))
s.listen(1)

k, d = s.accept()
nhandl = k.recv(1024)
print(nhandl)
print(nhandl.decode())

k.close()