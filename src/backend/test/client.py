import socket
import select
import sys

HOST = '127.0.0.2'
PORT = 65432
name = input('enter your name: ')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    try:
        s.connect((HOST, PORT))
        print('Connect successfully!!')
        s.send(bytes(name, 'utf-8'))
        while True:
            sockets_list = [sys.stdin, s]
            read_sockets, write_socket, error_socket = select.select(sockets_list, [], [])
            for socks in read_sockets:
                if socks == s:
                    message = socks.recv(1024).decode()
                    print(message)
                else:
                    message = input()
                    s.send(bytes(name + ': ' + message, 'utf8'))
    except Exception as e:
        print(e)