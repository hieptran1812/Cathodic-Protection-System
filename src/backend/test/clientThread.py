from threading import Thread


class ClientThread(Thread):
    def __init__(self, conn, addr, client):
        super().__init__()
        self.conn = conn
        self.addr = addr
        self.client = client
        self.name = ''

    def run(self):
        try:
            name = self.conn.recv(1024).decode()
            self.name = name
            self.sendMessageJoinRoom(name)
            while True:
                message = self.conn.recv(1024).decode()
                if message:
                    self.sendMessage(message)
        except Exception as e:
            print(e)


    def sendMessageJoinRoom(self, name):
        self.conn.send(bytes('welcome to room!', 'utf-8'))
        for client in self.client:
            if client.is_alive() and client.conn != self.conn:
                client.conn.send(bytes(name + ' has join room', 'utf-8'))


    def sendMessage(self, message):
        for client in self.client:
            if client.is_alive() and client.conn != self.conn:
                client.conn.send(bytes(message, 'utf-8'))