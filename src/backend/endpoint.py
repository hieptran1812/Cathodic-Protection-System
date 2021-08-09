import logging
logging.basicConfig(filename='log_endpoint.log', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.DEBUG)
from flask import Flask, jsonify, request, session, redirect
from flask_pymongo import pymongo
from flask_cors import CORS, cross_origin

from configDB import db
from testSocket import getDataFromTestPost, getDataFromRectifier
from controller import login, signout
import datetime
import sys
import json

from bson import ObjectId
logging.info("Start API")

app = Flask(__name__)
cors = CORS(app)
app.config['JSON_AS_ASCII'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

logging.info('Flask started')

@app.route('/')
@cross_origin()
def running():
  return "API running..."

################ Sign in, sign out ##################

# @app.before_request
# def before_request():
#   session.permanent = True
# # app.permanent_session_lifetime = timedelta(minutes=10)
#   print(request.endpoint)
#   if 'logged_in' not in session:
#     print('not log')
#     return redirect("/")

@app.route("/api/signout")
def signout():
    return signout()

@app.route('/api/login', methods=['POST'])
def index():
  if request.method == 'POST':
    print('api login')
    return login()

################ User ##################
@app.route('/api/addUser', methods=['POST'])
def createUser():
  logging.info("start API add new user")
  res = request.get_json()
  userData = {
    'name': res['name'],
    'username': res['username'],
    'password': res['password'],
    'organization': res['organization'],
    'email': res['email'],
    'phone': res['phone'],
    'address': res['address'],
    'role': res['role'],
  }
  user = db.User.find_one({ 
      'username': res['username']
  })
  if user:
      return 'nguoi dung da ton tai', 404
  else:
      insertUser = db.User.insert_one(userData)
      return 'hoan thanh', 200


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

@app.route('/api/users/<id>', methods=['GET', 'POST'])
def getUserDetail(id):
  if request.method == 'GET':
    user = db.User.find_one({'_id': ObjectId(id)})
    res = {}
    res['name'] = user['name']
    res['username'] = user['username'],
    res['role'] = user['role'],
    res['email'] = user['email'],
    res['phone'] = user['phone'],
    res['organization'] = user['organization'],
    res['address'] = user['address']
    return jsonify(res), 200

# @app.route('/api/users/delete/<id>', methods=['DELETE'])
# def deleteUser(id):
#   db.User.delete_one({'_id': ObjectId(id)})
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

@app.route('/api/rectifierTransformer/<id>', methods=['GET'])
def getRectifierTransformerDetail(id):
  if request.method == 'GET':
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

@app.route('/api/rectifierTransformer/table/<id>', methods=['GET'])
def getRectifierTransformerDetailTable(id):
  if request.method == 'GET':
    deviceInfo = db.RectifierTransformersDetails.find_one({
      'devSerial': id,
    })
    result = deviceInfo['otherInfo']
    i = 0
    for data in result:
      data['id'] = i
      i += 1
    return jsonify(result)


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

# @app.route('/api/testPost/<id>', methods=['GET'])
# def getTestPostDetail(id):
#   if request.method == 'GET':
#     # getDataFromTestPost()
#     deviceInfo = db.TestPostsDetails.find_one({
#       'devSerial': id,
#     })
#     if deviceInfo: 
#       result = {}
#       result['devSerial'] = deviceInfo['devSerial']
#       result['time'] = datetime.datetime.now()
#       result['locationSystem'] = deviceInfo['otherInfo'][0]['locationSystem']
#       result['centralAddress'] = deviceInfo['otherInfo'][0]['centralAddress']
#       result['nodeAddress'] = deviceInfo['otherInfo'][0]['nodeAddress']
#       result['dienApPin'] = deviceInfo['otherInfo'][0]['dienApPin']
#       result['dienApNguon'] = deviceInfo['otherInfo'][0]['dienApNguon']
#       result['temperature'] = deviceInfo['otherInfo'][0]['temperature']
#       result['openPoint1'] = deviceInfo['otherInfo'][0]['openPoint1']
#       result['openPoint2'] = deviceInfo['otherInfo'][0]['openPoint2']
#       result['openPoint3'] = deviceInfo['otherInfo'][0]['openPoint3']
#       result['openPoint4'] = deviceInfo['otherInfo'][0]['openPoint4']
#       result['closePoint1'] = deviceInfo['otherInfo'][0]['closePoint1']
#       result['closePoint2'] = deviceInfo['otherInfo'][0]['closePoint2']
#       result['closePoint3'] = deviceInfo['otherInfo'][0]['closePoint3']
#       result['closePoint4'] = deviceInfo['otherInfo'][0]['closePoint4']
#       result['phone'] = deviceInfo['otherInfo'][0]['phone']
#       result['signalQuality'] = deviceInfo['otherInfo'][0]['signalQuality']
#     else: 
#       result = {}
#       result['devSerial'] = 'Khong co du lieu cho thiet bi nay'
#       result['time'] = 'Khong co du lieu cho thiet bi nay'
#       result['locationSystem'] = 'Khong co du lieu cho thiet bi nay'
#       result['centralAddress'] = 'Khong co du lieu cho thiet bi nay'
#       result['dienApPin'] = 'Khong co du lieu cho thiet bi nay'
#       result['dienApNguon'] = 'Khong co du lieu cho thiet bi nay'
#       result['temperature'] = 'Khong co du lieu cho thiet bi nay'
#       result['dienAC3Pha'] = 'Khong co du lieu cho thiet bi nay'
#       result['dienDCPoint1'] = 'Khong co du lieu cho thiet bi nay'
#       result['dongDienDC'] = 'Khong co du lieu cho thiet bi nay'
#       result['phone'] = 'Khong co du lieu cho thiet bi nay'
#       result['signalQuality'] = 'Khong co du lieu cho thiet bi nay'
#     return result

@app.route('/api/testPost/table/<id>', methods=['GET'])
def getTestPostDetailTable(id):
  if request.method == 'GET':
    deviceInfo = db.TestPostsDetails.find_one({
      'devSerial': id,
    })
    result = deviceInfo['otherInfo']
    i = 0
    for data in result:
      data['id'] = i
      i += 1
    return jsonify(result)

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
    
