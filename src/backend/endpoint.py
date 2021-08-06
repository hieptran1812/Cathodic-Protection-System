import logging
logging.basicConfig(filename='log_endpoint.log', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.DEBUG)
from flask import Flask, jsonify, request
from flask_pymongo import pymongo
from flask_cors import CORS, cross_origin

from configDB import db
from testSocket import getDataFromTestPost, getDataFromRectifier
import datetime
# import threading
import socket
import sys
import json

from bson import ObjectId
logging.info("Start API")
# logging.debug('This is a debug log message.')
# logging.info('This is a info log message.')
# logging.warning('This is a warning log message.')
# logging.error('This is a error log message.')
# logging.critical('This is a critical log message.')

app = Flask(__name__)
cors = CORS(app)
app.config['JSON_AS_ASCII'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

logging.info('Flask started')

@app.route('/')
@cross_origin()
def running():
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
    logging.info("start API get users list")
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

@app.route('/api/newProduct', methods=['POST'])
def addNewProduct():
  logging.info("start API add new product")
  res = request.get_json()
  deviceRectifierTransformer = {
    'devSerial': res['id'],
    'devType': res['type'],
    'otherInfo': [{
      'locationSystem': '0',
      'centralAddress': '0',
      'phone': '0',
      'signalQuality': '0',
      'dienApPin': '0',
      'dienApNguon': '0',
      'temperature': '0',
      'dienAC3Pha': '0',
      'dienDCPoint1': '0',
      'dongDienDC': '0',
    }],
  }
  deviceTestPost = {
    'devSerial': res['id'],
    'devType': res['type'],
    'otherInfo': [{
      'locationSystem': '0',
      'centralAddress': '0',
      'phone': '0',
      'signalQuality': '0',
      'nodeAddress': '0',
      'dienApPin' : '0',
      'dienApNguon': '0',
      'temperature': '0',
      'openPoint1': '0',
      'openPoint2': '0',
      'openPoint3': '0',
      'openPoint4': '0',
      'closePoint1': '0',
      'closePoint2': '0',
      'closePoint3': '0',
      'closePoint4': '0',
    }],
  }
  deviceInDb = db.RectifierTransformersDetails.find_one({ #tim thiet bi trong danh sach bo trung tam
      'devSerial': res['id']
  })
  deviceInDb = db.TestPostsDetails.find_one({ #tim thiet bi trong danh sach bo do
      'devSerial': res['id']
  })
  if deviceInDb:
      return 'thiet bi da ton tai', 404
  else:
      if(res['type'] == '0'):
        insertDevice = db.RectifierTransformersDetails.insert_one(deviceRectifierTransformer)
      else:
        insertDevice = db.TestPostsDetails.insert_one(deviceTestPost)
      return 'hoan thanh', 200

# @socketio.on('connect', namespace='/api/rectifierTransformer/<id>', method=['GET'])
@app.route('/api/rectifierTransformer/<id>', methods=['GET'])
def getRectifierTransformerDetail(id):
  if request.method == 'GET':
    # getDataFromRectifier()
    deviceInfo = db.RectifierTransformersDetails.find_one({
      'devSerial': id,
    })
    if deviceInfo: 
      result = {}
      result['devSerial'] = deviceInfo['devSerial']
      result['time'] = datetime.datetime.now()
      result['locationSystem'] = deviceInfo['otherInfo'][0]['locationSystem']
      result['centralAddress'] = deviceInfo['otherInfo'][0]['centralAddress']
      result['dienApPin'] = deviceInfo['otherInfo'][0]['dienApPin']
      result['dienApNguon'] = deviceInfo['otherInfo'][0]['dienApNguon']
      result['temperature'] = deviceInfo['otherInfo'][0]['temperature']
      result['dienAC3Pha'] = deviceInfo['otherInfo'][0]['dienAC3Pha']
      result['dienDCPoint1'] = deviceInfo['otherInfo'][0]['dienDCPoint1']
      result['dongDienDC'] = deviceInfo['otherInfo'][0]['dongDienDC']
      result['phone'] = deviceInfo['otherInfo'][0]['phone']
      result['signalQuality'] = deviceInfo['otherInfo'][0]['signalQuality']
    else: 
      result = {}
      result['devSerial'] = 'Khong co du lieu cho thiet bi nay'
      result['time'] = 'Khong co du lieu cho thiet bi nay'
      result['locationSystem'] = 'Khong co du lieu cho thiet bi nay'
      result['centralAddress'] = 'Khong co du lieu cho thiet bi nay'
      result['dienApPin'] = 'Khong co du lieu cho thiet bi nay'
      result['dienApNguon'] = 'Khong co du lieu cho thiet bi nay'
      result['temperature'] = 'Khong co du lieu cho thiet bi nay'
      result['dienAC3Pha'] = 'Khong co du lieu cho thiet bi nay'
      result['dienDCPoint1'] = 'Khong co du lieu cho thiet bi nay'
      result['dongDienDC'] = 'Khong co du lieu cho thiet bi nay'
      result['phone'] = 'Khong co du lieu cho thiet bi nay'
      result['signalQuality'] = 'Khong co du lieu cho thiet bi nay'
    return result

@app.route('/api/rectifierTransformerList/', methods=['GET'])
def getRectifier():
  logging.info("start API get Rectifier Transformers list")
  devices = []
  for doc in db.RectifierTransformersDetails.find({}):
      devices.append({
        'id': str(ObjectId(doc['_id'])),
        'devSerial': doc['devSerial'],
        'locationSystem': doc['otherInfo'][0]['locationSystem'],
        'centralAddress': doc['otherInfo'][0]['centralAddress'],
        'phone': doc['otherInfo'][0]['phone'],
        'signalQuality': doc['otherInfo'][0]['signalQuality'],
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

@app.route('/api/testPostList', methods=['GET'])
def getTestPost():
    logging.info("start API get Test Posts list")
    devices = []
    for doc in db.TestPostsDetails.find({}):
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'locationSystem': doc['otherInfo'][0]['locationSystem'],
          'centralAddress': doc['otherInfo'][0]['centralAddress'],
          'phone': doc['otherInfo'][0]['phone'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
        })
    return jsonify(devices)

@app.route('/api/testPost/<id>', methods=['GET'])
def getTestPostDetail(id):
  if request.method == 'GET':
    # getDataFromTestPost()
    deviceInfo = db.TestPostsDetails.find_one({
      'devSerial': id,
    })
    if deviceInfo: 
      result = {}
      result['devSerial'] = deviceInfo['devSerial']
      result['time'] = datetime.datetime.now()
      result['locationSystem'] = deviceInfo['otherInfo'][0]['locationSystem']
      result['centralAddress'] = deviceInfo['otherInfo'][0]['centralAddress']
      result['nodeAddress'] = deviceInfo['otherInfo'][0]['nodeAddress']
      result['dienApPin'] = deviceInfo['otherInfo'][0]['dienApPin']
      result['dienApNguon'] = deviceInfo['otherInfo'][0]['dienApNguon']
      result['temperature'] = deviceInfo['otherInfo'][0]['temperature']
      result['openPoint1'] = deviceInfo['otherInfo'][0]['openPoint1']
      result['openPoint2'] = deviceInfo['otherInfo'][0]['openPoint2']
      result['openPoint3'] = deviceInfo['otherInfo'][0]['openPoint3']
      result['openPoint4'] = deviceInfo['otherInfo'][0]['openPoint4']
      result['closePoint1'] = deviceInfo['otherInfo'][0]['closePoint1']
      result['closePoint2'] = deviceInfo['otherInfo'][0]['closePoint2']
      result['closePoint3'] = deviceInfo['otherInfo'][0]['closePoint3']
      result['closePoint4'] = deviceInfo['otherInfo'][0]['closePoint4']
      result['phone'] = deviceInfo['otherInfo'][0]['phone']
      result['signalQuality'] = deviceInfo['otherInfo'][0]['signalQuality']
    else: 
      result = {}
      result['devSerial'] = 'Khong co du lieu cho thiet bi nay'
      result['time'] = 'Khong co du lieu cho thiet bi nay'
      result['locationSystem'] = 'Khong co du lieu cho thiet bi nay'
      result['centralAddress'] = 'Khong co du lieu cho thiet bi nay'
      result['dienApPin'] = 'Khong co du lieu cho thiet bi nay'
      result['dienApNguon'] = 'Khong co du lieu cho thiet bi nay'
      result['temperature'] = 'Khong co du lieu cho thiet bi nay'
      result['dienAC3Pha'] = 'Khong co du lieu cho thiet bi nay'
      result['dienDCPoint1'] = 'Khong co du lieu cho thiet bi nay'
      result['dongDienDC'] = 'Khong co du lieu cho thiet bi nay'
      result['phone'] = 'Khong co du lieu cho thiet bi nay'
      result['signalQuality'] = 'Khong co du lieu cho thiet bi nay'
    return result

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
    print('run App')
    app.run(port=5000,host='0.0.0.0')
    
