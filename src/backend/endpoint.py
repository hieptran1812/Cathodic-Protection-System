from flask import Flask, jsonify, request
from flask_pymongo import pymongo
from flask_cors import CORS
print("start")
from testSocket import getDataFromTestPost, getDataFromRectifier
from configDB import db
import socket
import sys
import json

from bson import ObjectId

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

# sv_address = '127.0.0.1'
# sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# # Bind the socket to the port
# server_address = (sv_address, 30001)
# print(sys.stderr, 'starting up on %s port %s' % server_address)
# sock.bind(server_address)
# sock.listen(1)
# print(sys.stderr, 'waiting for a connection')
# connection, client_address = sock.accept()

# print(connection)
# print(client_address)
# initSocket()

@app.route('/')
def t():
  return "API running..."

################ User ##################
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  # id = db.insert({
  #   'name': request.json['name'],
  #   'email': request.json['email'],
  #   'password': request.json['password']
  # })
  # return jsonify(str(ObjectId(id)))
  return "oke"


@app.route('/api/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.User.find({}):
      users.append({
        'id': str(ObjectId(doc['_id'])),
        'name': doc['name'],
        'email': doc['email'],
        'phone': doc['phone'],
        'address': doc['address'],
        'role':doc['role'],
      })
    return jsonify(users)

# @app.route('/users/<id>', methods=['GET'])
# def getUser(id):
#   user = db.find_one({'_id': ObjectId(id)})
#   print(user)
#   return jsonify({
#       '_id': str(ObjectId(user['_id'])),
#       'name': user['name'],
#       'email': user['email'],
#       'password': user['password']
#   })

# @app.route('/users/<id>', methods=['DELETE'])
# def deleteUser(id):
#   db.delete_one({'_id': ObjectId(id)})
#   return jsonify({'message': 'User Deleted'})

# @app.route('/users/<id>', methods=['PUT'])
# def updateUser(id):
#   print(request.json)
#   db.update_one({'_id': ObjectId(id)}, {"$set": {
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   }})
#   return jsonify({'message': 'User Updated'})


# ################ bo trung tam ##################
# @app.route('/newRectifier', methods=['POST'])
# def createRectifier():
#   print(request.json)
#   id = db.insert({
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   })
#   return jsonify(str(ObjectId(id)))


@app.route('/api/rectifierTransformer/<devSerial>', methods=['GET'])
def getRectifierTransformerDetail(devSerial):
  if request.method == 'GET':
    name = db.RectifierTransformers.find_one({
      'devSerial': devSerial,
    })
    return jsonify(getDataFromRectifier())

@app.route('/api/rectifierTransformerList/', methods=['GET'])
def getRectifier():
  devices = []
  for doc in db.RectifierTransformers.find({}):
      devices.append({
        'id': str(ObjectId(doc['_id'])),
        'devSerial': doc['devSerial'],
        'locationSystem': doc['locationSystem'],
        'centralAddress': doc['centralAddress'],
        'phone': doc['phone'],
        'signalQuality': doc['signalQuality'],
      })
  return jsonify(devices)

# @app.route('/rectifierTransformerList/<id>', methods=['DELETE'])
# def deleteRectifier(id):
#   db.delete_one({'_id': ObjectId(id)})
#   return jsonify({'message': 'User Deleted'})

# @app.route('/rectifierTransformer/<id>', methods=['PUT'])
# def updateRectifier(id):
#   print(request.json)
#   db.update_one({'_id': ObjectId(id)}, {"$set": {
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   }})
#   return jsonify({'message': 'User Updated'})


# ################ Bo do ##################
# @app.route('/newTestPost', methods=['POST'])
# def createTestPost():
#   print(request.json)
#   id = db.insert({
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   })
#   return jsonify(str(ObjectId(id)))

# @app.route('/testPostList', methods=['GET'])
# def getTestPost():
#     users = []
#     for doc in db.find():
#         users.append({
#             '_id': str(ObjectId(doc['_id'])),
#             'name': doc['name'],
#             'email': doc['email'],
#             'password': doc['password']
#         })
#     return jsonify(users)

@app.route('/api/testPost/1', methods=['GET'])
def getTestPostDetail():
  if request.method == 'GET':
    return jsonify(getDataFromTestPost())

# @app.route('/testPostList/<id>', methods=['DELETE'])
# def deleteTestPost(id):
#   db.delete_one({'_id': ObjectId(id)})
#   return jsonify({'message': 'User Deleted'})

# @app.route('/testPost/<id>', methods=['PUT'])
# def updateTestPost(id):
#   print(request.json)
#   db.update_one({'_id': ObjectId(id)}, {"$set": {
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   }})
#   return jsonify({'message': 'User Updated'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
