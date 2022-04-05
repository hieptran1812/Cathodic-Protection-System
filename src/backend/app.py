import logging
logging.basicConfig(filename='server.log', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.DEBUG)
from flask import Flask, jsonify, request, session, redirect
from flask_pymongo import pymongo
from flask_cors import CORS, cross_origin

from configDB import db

from loginHandler import login, currentUser
from pushDatafromDevices import getDataFromTestPost, getDataFromRectifier
from notifications import getNumberOfNoti, getNotifications, editStatusNoti, forgotPassword, signUp

import datetime
import sys
import json
import ssl

import uvicorn

from bson import ObjectId
logging.info("Start API")

app = Flask(__name__)
cors = CORS(app)
app.config['JSON_AS_ASCII'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def running():
  return "API running..."

################ Sign in, sign out ##################

@app.route('/api/login', methods=['POST'])
def index():
  if request.method == 'POST':
    return login()

@app.route('/api/signUp', methods=['POST'])
def register():
  return signUp()

@app.route('/api/forgotpassword', methods=['POST'])
def postForgotPassword():
  return forgotPassword()


################ Notification ###############
@app.route('/api/notificationsSidebar/', methods=['GET'])
def countsNoti():
  return getNumberOfNoti()

@app.route('/api/notificationsList', methods=['GET'])
def notificationsList():
    return getNotifications()

@app.route('/api/editStatus/', methods=['POST'])
def editStatus():
  return editStatusNoti()

################ Dashboard ###############
@app.route('/api/featureInfo/', methods=['GET'])
def getFeatureInfo():
  # Khoi tao bien BTT
  countBTT = 0
  maxDC = 0
  maxDCName = ""
  maxAC = 0
  maxACName = ""
  countErrorRectifiers = 0
  BTTLoiList = []
  # Khoi tao bien BD
  countBD = 0
  maxPort = -9999
  maxPortName = ""
  minPort = 9999
  minPortName = ""
  countErrorTestPosts = 0
  BDLoiList = []
  # Tim kiem
  for doc in db.RectifierTransformersDetails.find({}):
    status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
    if (status >= 300):
        status = "notConnected"
    else:
        status = "connected"
    if(currentUser['role'] == 'superadmin'):
      countBTT += 1
      # Tim maxDC
      if (int(doc['otherInfo'][0]['dienDCPoint1']) > maxDC):
            maxDC = int(doc['otherInfo'][0]['dienDCPoint1'])
            maxDCName = doc['maChuoi']
      # Tim maxAC
      if (int(doc['otherInfo'][0]['dienAC3PhaA']) > maxAC):
            maxAC = int(doc['otherInfo'][0]['dienAC3PhaA'])
            maxACName = doc['maChuoi']
      # Tim BTT loi
      if(status == "notConnected"):
            countErrorRectifiers += 1
            BTTLoiList.append(doc['maChuoi'])
    else:
      if(doc['organization'] == currentUser['organization']): #dieu kien cho rieng to chuc
        countBTT += 1
        # Tim maxDC
        if (int(doc['otherInfo'][0]['dienDCPoint1']) > maxDC):
              maxDC = int(doc['otherInfo'][0]['dienDCPoint1'])
              maxDCName = doc['maChuoi']
        # Tim maxAC
        if (int(doc['otherInfo'][0]['dienAC3PhaA']) > maxAC):
              maxAC = int(doc['otherInfo'][0]['dienAC3PhaA'])
              maxACName = doc['maChuoi']
        # Tim BTT loi
        if(status == "notConnected"):
              countErrorRectifiers += 1
              BTTLoiList.append(doc['maChuoi'])
  
  for doc in db.TestPostsDetails.find({}):
    status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
    if (status >= 300):
        status = "notConnected"
    else:
        status = "connected"
    if(currentUser['role'] == 'superadmin'):
      countBD += 1
       # Tim Port co dien the cao nhat va thap nhat
      listPort = [float(doc['otherInfo'][0]['openPoint1']), float(doc['otherInfo'][0]['openPoint2']), float(doc['otherInfo'][0]['openPoint3']), float(doc['otherInfo'][0]['openPoint3']), float(doc['otherInfo'][0]['closePoint1']), float(doc['otherInfo'][0]['closePoint2']), float(doc['otherInfo'][0]['closePoint3']), float(doc['otherInfo'][0]['closePoint4'])]
      if (max(listPort) > maxPort):
            maxPortName = doc['maChuoi']
            maxPort = max(listPort)
      if (min(listPort) < minPort):
            minPortName = doc['maChuoi']
            minPort = min(listPort)
      if(status == "notConnected"):
            countErrorTestPosts += 1
            BDLoiList.append(doc['maChuoi'])
    else:
      if(doc['organization'] == currentUser['organization']): #dieu kien cho rieng to chuc
        countBD += 1
         # Tim Port co dien the cao nhat va thap nhat
        listPort = [float(doc['otherInfo'][0]['openPoint1']), float(doc['otherInfo'][0]['openPoint2']), float(doc['otherInfo'][0]['openPoint3']), float(doc['otherInfo'][0]['openPoint3']), float(doc['otherInfo'][0]['closePoint1']), float(doc['otherInfo'][0]['closePoint2']), float(doc['otherInfo'][0]['closePoint3']), float(doc['otherInfo'][0]['closePoint4'])]
        if (max(listPort) > maxPort):
              maxPortName = doc['maChuoi']
              maxPort = max(listPort)
        if (min(listPort) < minPort):
              minPortName = doc['maChuoi']
              minPort = min(listPort)
        if(status == "notConnected"):
              countErrorTestPosts += 1
              BDLoiList.append(doc['maChuoi'])
  countDevicesBTT = countBTT
  countDevicesBD = countBD
  BTTLoi = ', '.join(BTTLoiList)
  BDLoi = ", ". join(BDLoiList)
  info = {
    'countDevicesBTT': countDevicesBTT,
    'maxDC': round(maxDC, 3),
    'maxDCName': maxDCName,
    'maxAC': round(maxAC, 3),
    'maxACName': maxACName,
    'countErrorRectifiers': countErrorRectifiers,
    'BTTLoi': BTTLoi,
    'countDevicesBD': countDevicesBD,
    'minPort': round(minPort, 3),
    'minPortName': minPortName,
    'maxPort': round(maxPort, 3),
    'maxPortName': maxPortName,
    'countErrorTestPosts': countErrorTestPosts,
    'BDLoi': BDLoi
  }
  return jsonify(info)

@app.route('/api/chartDCMax/', methods=['GET'])
def getChartDCandAC():
  # Khoi tao bien
  maxDC = [0,0,0,0,0,0,0,0]
  maxDCName = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  maxDCTime = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  maxAC = [0,0,0,0,0,0,0,0]
  maxACName = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  maxACTime = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  ###########################
  # Tim kiem
  for doc in db.RectifierTransformersDetails.find({}):
    if(len(doc['otherInfo']) == 1):
      continue;
    if(currentUser['role'] == 'superadmin'):
      for i in range(min(8,len(doc['otherInfo']))):
        # Tim mang maxDC
        if (int(doc['otherInfo'][i]['dienDCPoint1']) > maxDC[i]):
            maxDC[i] = int(doc['otherInfo'][i]['dienDCPoint1'])
            maxDCTime[i] = doc['otherInfo'][i]['time']
            maxDCName[i] = doc['maChuoi']
        # Tim mang maxAC
        if (int(doc['otherInfo'][i]['dienAC3PhaA']) > maxAC[i]):
            maxAC[i] = int(doc['otherInfo'][i]['dienAC3PhaA'])
            maxACTime[i] = doc['otherInfo'][i]['time']
            maxACName[i] = doc['maChuoi']
    else:
      if(doc['organization'] == currentUser['organization']): #dieu kien cho rieng to chuc
        for i in range(min(8,len(doc['otherInfo']))):
          # Tim mang maxDC
          if (int(doc['otherInfo'][i]['dienDCPoint1']) > maxDC[i]):
            maxDC[i] = int(doc['otherInfo'][i]['dienDCPoint1'])
            maxDCTime[i] = doc['otherInfo'][i]['time']
            maxDCName[i] = doc['maChuoi']
          # Tim mang maxAC
          if (int(doc['otherInfo'][i]['dienAC3PhaA']) > maxAC[i]):
            maxAC[i] = int(doc['otherInfo'][i]['dienAC3PhaA'])
            maxACTime[i] = doc['otherInfo'][i]['time']
            maxACName[i] = doc['maChuoi']
  info = {
    'maxDC': maxDC,
    'maxDCName': maxDCName,
    'maxDCTime': maxDCTime,
    'maxAC': maxAC,
    'maxACName': maxACName,
    'maxACTime': maxACTime,
  }
  return jsonify(info)

@app.route('/api/chartPortMax/', methods=['GET'])
def getChartPortMax():
  # Khoi tao bien
  maxPort = [9999,9999,9999,9999,9999,9999,9999,9999]
  maxPortName = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  maxPortTime = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  ###########################
  # Tim kiem
  for doc in db.TestPostsDetails.find({}):
    if(len(doc['otherInfo']) == 1):
      continue;
    if(currentUser['role'] == 'superadmin'):
      for i in range(min(8,len(doc['otherInfo'])-1)):
        listPort = [float(doc['otherInfo'][i]['openPoint1']), float(doc['otherInfo'][i]['openPoint2']), float(doc['otherInfo'][i]['openPoint3']), float(doc['otherInfo'][i]['openPoint3']), float(doc['otherInfo'][i]['closePoint1']), float(doc['otherInfo'][i]['closePoint2']), float(doc['otherInfo'][i]['closePoint3']), float(doc['otherInfo'][i]['closePoint4'])]
        # Tim mang port
        # print(listPort)
        # print(maxPort[i], maxPortTime[i], maxPortName[i])
        if (min(listPort) < maxPort[i]):
            maxPort[i] = round(min(listPort),3)
            maxPortTime[i] = doc['otherInfo'][i]['time']
            maxPortName[i] = doc['maChuoi']
            # print("con")
            # print(maxPort[i], maxPortTime[i], maxPortName[i])
    else:
      if(doc['organization'] == currentUser['organization']): #dieu kien cho rieng to chuc
        for i in range(min(8,len(doc['otherInfo']))):
          listPort = [float(doc['otherInfo'][i]['openPoint1']), float(doc['otherInfo'][i]['openPoint2']), float(doc['otherInfo'][i]['openPoint3']), float(doc['otherInfo'][i]['openPoint3']), float(doc['otherInfo'][i]['closePoint1']), float(doc['otherInfo'][i]['closePoint2']), float(doc['otherInfo'][i]['closePoint3']), float(doc['otherInfo'][i]['closePoint4'])]
          # Tim mang port
          if (min(listPort) > maxPort[i]):
            maxPort[i] = round(min(listPort),3)
            maxPortTime[i] = doc['otherInfo'][i]['time']
            maxPortName[i] = doc['maChuoi']
  info = {
    'maxPort': maxPort,
    'maxPortName': maxPortName,
    'maxPortTime': maxPortTime,
  }
  return jsonify(info)


@app.route('/api/dashboardList/', methods=['GET'])
def getDashboard():
  devices = []
  # print(currentUser['role'])
  for doc in db.RectifierTransformersDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
      if (status >= 300):
            status = "notConnected"
      else:
            status = "connected"
      devices.append({
      'id': str(ObjectId(doc['_id'])),
      'devSerial': doc['devSerial'],
      'devType': "Bo trung tam",
      'dateUpdate': doc['dateUpdate'],
      'date': doc['date'],
      'organization': doc['organization'],
      'signalQuality': doc['otherInfo'][0]['signalQuality'],
      'maChuoi': doc['maChuoi'],
      'status': status
    })
    else:
      if(doc['organization'] == currentUser['organization']):
        status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
        if (status >= 300):
            status = "notConnected"
        else:
            status = "connected"
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'devType': "Bo trung tam",
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'organization': doc['organization'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'maChuoi': doc['maChuoi'],
          'status': status
        })
  for doc in db.TestPostsDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
      if (status >= 300):
          status = "notConnected"
      else:
          status = "connected"
      devices.append({
        'id': str(ObjectId(doc['_id'])),
        'devSerial': doc['devSerial'],
        'devType': "Bo do",
        'dateUpdate': doc['dateUpdate'],
        'date': doc['date'],
        'organization': doc['organization'],
        'signalQuality': doc['otherInfo'][0]['signalQuality'],
        'maChuoi': doc['maChuoi'],
        'status': status
      })
    else:
      if(doc['organization'] == currentUser['organization']):
        status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
        if (status >= 300):
            status = "notConnected"
        else:
            status = "connected"
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'devType': "Bo do",
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'organization': doc['organization'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'maChuoi': doc['maChuoi'],
          'status': status
        })
  return jsonify(devices)

################ User ##################
@app.route('/api/addUser', methods=['POST'])
def createUser():
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
    'notes': res['notes'],
    'dateRegistered': res['dateRegistered'],
    'dueDate': res['dueDate'],
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
    users = []
    if(currentUser['role'] == 'superadmin'):
      for doc in db.User.find({}):
        users.append({
          'id': str(ObjectId(doc['_id'])),
          'name': doc['name'],
          'email': doc['email'],
          'phone': doc['phone'],
          'address': doc['address'],
          'role':doc['role'],
          'organization':doc['organization'],
          'username': doc['username'],
          'dateRegistered': doc['dateRegistered'],
          'dueDate': doc['dueDate'],
        })
    elif(currentUser['role'] == 'admin'):
      for doc in db.User.find({
        'organization': currentUser['organization'],
        'role': 'viewer'
      }):
        users.append({
          'id': str(ObjectId(doc['_id'])),
          'name': doc['name'],
          'email': doc['email'],
          'phone': doc['phone'],
          'address': doc['address'],
          'role':doc['role'],
          'username': doc['username'],
          'organization':doc['organization'],
          'dateRegistered': doc['dateRegistered'],
          'dueDate': doc['dueDate'],
        })
    return jsonify(users)

@app.route('/api/users/<id>', methods=['GET'])
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
    res['address'] = user['address'],
    res['notes'] = user['notes']
    res['dateRegistered'] = user['dateRegistered'],
    res['dueDate'] = user['dueDate'],
    return jsonify(res), 200

@app.route('/api/user/delete/<id>', methods=['GET'])
def deleteUser(id):
  db.User.delete_one({'_id': ObjectId(id)})
  return 'hoan thanh', 200

@app.route('/api/editUser/<id>', methods=['POST'])
def updateUser(id):
  res = request.get_json()
  db.User.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': res['name'],
    'email': res['email'],
    'phone': res['phone'],
    'address': res['address'],
    'notes': res['notes'],
    'password': res['password'],
  }})
  return 'hoan thanh', 200


# ################ bo trung tam ##################

@app.route('/api/newRectifier', methods=['POST'])
def addRectifier():
  logging.info("start API add new Rectifier")
  res = request.get_json()
  deviceRectifierTransformer = {
    'devSerial': str(res['id']),
    'maChuoi': str(res['maChuoi']),
    'organization': str(res['organization']),
    'area': res['area'],
    'dateUpdate': res['dateUpdate'],
    'date': res['date'],
    'lat': float(res['lat']),
    'lng': float(res['lng']),
    'connect': ["Chua ket noi bo do nao!"],
    'ACInputPower':res['ACInputPower'],
    'otherInfo': [{
      'time': datetime.datetime.now(),
      'locationSystem': '0',
      'centralAddress': '0',
      'phone': '0',
      'signalQuality': 0,
      'dienApPin': 0,
      'dienApNguon': 0,
      'temperature': 0,
      'dienAC3PhaA': 0,
      'dienAC3PhaB': 0,
      'dienAC3PhaC': 0,
      'dienDCPoint1': 0,
      'dongDienDC': 0,
    }],
  }
  deviceInDb = db.RectifierTransformersDetails.find_one({ #tim thiet bi trong danh sach bo trung tam
      'devSerial': res['id']
  })
  if deviceInDb:
      return 'thiet bi da ton tai', 203
  else:
      insertDeviceDetails = db.RectifierTransformersDetails.insert_one(deviceRectifierTransformer)
      return 'hoan thanh', 200

@app.route('/api/rectifierTransformerNameList/', methods=['GET'])
def getNameRT():
  devices = []
  for doc in db.RectifierTransformersDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      devices.append({'maChuoi': doc['maChuoi'],})
    else:
      if(doc['organization'] == currentUser['organization']):
        devices.append({'maChuoi': doc['maChuoi'],})
  return jsonify(devices)

@app.route('/api/rectifierTransformerList/', methods=['GET'])
def get():
  devices = []
  for doc in db.RectifierTransformersDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
      if (status >= 300):
        status = "notConnected"
      else:
        status = "connected"
      devices.append({
      'id': str(ObjectId(doc['_id'])),
      'status': status,
      'devSerial': doc['devSerial'],
      'maChuoi': doc['maChuoi'],
      'centralAddress': doc['otherInfo'][0]['centralAddress'],
      'phone': doc['otherInfo'][0]['phone'],
      'dateUpdate': doc['dateUpdate'],
      'date': doc['date'],
      'signalQuality': doc['otherInfo'][0]['signalQuality'],
      'dienApPin': doc['otherInfo'][0]['dienApPin'],
    })
    else:
      if(doc['organization'] == currentUser['organization']):
        status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
        if (status >= 300):
          status = "notConnected"
        else:
          status = "connected"
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'status': status,
          'maChuoi': doc['maChuoi'],
          'centralAddress': doc['otherInfo'][0]['centralAddress'],
          'phone': doc['otherInfo'][0]['phone'],
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'dienApPin': doc['otherInfo'][0]['dienApPin'],
        })
  return jsonify(devices)

@app.route('/api/rectifierTransformer/table/<id>', methods=['GET'])
def getRectifierTransformerDetailTable(id):
  if request.method == 'GET':
    deviceInfo = db.RectifierTransformersDetails.find_one({
      'devSerial': id,
    })
    result = deviceInfo['otherInfo']
    result[0]['tenThietBi'] = deviceInfo['maChuoi']
    result[0]['dateUpdate'] = deviceInfo['dateUpdate']
    result[0]['date'] = deviceInfo['date']
    result[0]['ACInputPower'] = deviceInfo['ACInputPower']
    result[0]['area'] = deviceInfo['area'],
    result[0]['lat'] = deviceInfo['lat'],
    result[0]['lng'] = deviceInfo['lng'],
    result[0]['organization'] = deviceInfo['organization'],
    result[0]['devSerial'] = deviceInfo['devSerial'],
  
    #Bo do lien ket voi Bo trung tam
    connect = ""
    for i in range(len(deviceInfo['connect'])):
      if (i == len(deviceInfo['connect']) - 1):
        connect += str(deviceInfo['connect'][i])
      else:
        connect += str(deviceInfo['connect'][i]) + ", "  
    result[0]['connect'] = connect
    i = 0
    for data in result:
      data['id'] = i
      i += 1
    return jsonify(result)

@app.route('/api/rectifierTransformer/update/<id>', methods=['POST'])
def updateRT(id):
  res = request.get_json()
  update = db.RectifierTransformersDetails.update_one({'devSerial': id}, {"$set": {
    'maChuoi': str(res['maChuoi']),
    'date': res['date'],
    'dateUpdate': res['dateUpdate'],
    'area': res['area'],
    'lat': res['lat'],
    'lng': res['lng'],
    'ACInputPower': res['ACInputPower'],
    'organization':str(res['organization']),
    'devSerial':str(res['devSerial']),
  }})
  return 'hoan thanh', 200

@app.route('/api/rectifierTransformer/delete/<id>', methods=['GET'])
def delete(id):
  logging.info("delete Rectifier")
  deviceInfo = db.RectifierTransformersDetails.find_one({
      'devSerial': id,
  })
  for tp in deviceInfo['connect']:
    updateConnectTP = db.TestPostsDetails.update_one({'maChuoi': tp}, {'$set': {'connect': "Chua ket noi Bo trung tam nao!"}}, upsert = False)
  deleteVar = db.TestPostsDetails.update_one({'maChuoi': deviceInfo['connect']}, {'$pull':{'connect': deviceInfo['maChuoi']}}, upsert = False)
  db.RectifierTransformersDetails.delete_one({'devSerial': id})
  return 'hoan thanh', 200

@app.route('/api/getChartDC/<id>', methods=['GET'])
def getChartDC(id):
  deviceInfo = db.RectifierTransformersDetails.find_one({
    'devSerial': id,
  })
  dc = [0,0,0,0,0,0,0,0]
  time = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  # print(min(8,len(deviceInfo['otherInfo'])))
  for i in range(min(8,len(deviceInfo['otherInfo']))):
      dc[i] = deviceInfo['otherInfo'][i]['dienDCPoint1']
      time[i] = deviceInfo['otherInfo'][i]['time']
  info = {
    'dc': dc,
    'time': time
  }
  return jsonify(info)

# ################ Bo do ##################

@app.route('/api/newTestPost', methods=['POST'])
def addTestPost():
  logging.info("start API add new Testpost")
  res = request.get_json()
  deviceTestPost = {
    'devSerial': str(res['id']),
    'maChuoi': str(res['maChuoi']),
    'organization': str(res['organization']),
    'area': res['area'],
    'dateUpdate': res['dateUpdate'],
    'date': res['date'],
    'lat': float(res['lat']),
    'lng': float(res['lng']),
    'connect': res['connect'],
    'ACInputPower':res['ACInputPower'],
    'otherInfo': [{
      'time': datetime.datetime.now(),
      'locationSystem': '0',
      'centralAddress': '0',
      'phone': '0',
      'signalQuality': 0,
      'nodeAddress': '0',
      'dienApPin' : 0,
      'dienApNguon': 0,
      'temperature': 0,
      'openPoint1': 0,
      'openPoint2': 0,
      'openPoint3': 0,
      'openPoint4': 0,
      'closePoint1': 0,
      'closePoint2': 0,
      'closePoint3': 0,
      'closePoint4': 0,
    }],
  }
  deviceInDb = db.TestPostsDetails.find_one({ #tim thiet bi trong danh sach bo do
      'devSerial': res['id']
  })
  if deviceInDb:
      return 'thiet bi da ton tai', 203
  else:
    updateConnectRT = db.RectifierTransformersDetails.update_one({'maChuoi': res['connect']}, {'$push': {'connect': res['maChuoi']}}, upsert = False)
    deleteVar = db.RectifierTransformersDetails.update_one({'maChuoi': res['connect']}, {'$pull':{'connect': 'Chua ket noi Bo do nao!'}}, upsert = False)
    insertDeviceDetails = db.TestPostsDetails.insert_one(deviceTestPost)
    return 'hoan thanh', 200

@app.route('/api/testPostList', methods=['GET'])
def getTestPost():
    devices = []
    for doc in db.TestPostsDetails.find({}):
      if(currentUser['role'] == 'superadmin'):
        status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
        if (status >= 300):
          status = "notConnected"
        else:
          status = "connected"
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'status':status,
          'devSerial': doc['devSerial'],
          'maChuoi': doc['maChuoi'],
          'centralAddress': doc['otherInfo'][0]['centralAddress'],
          'phone': doc['otherInfo'][0]['phone'],
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'dienApPin': doc['otherInfo'][0]['dienApPin']
        })
      else:
        if(doc['organization'] == currentUser['organization']):
          status = (datetime.datetime.now() - doc['otherInfo'][0]['time']).total_seconds()
          if (status >= 300):
            status = "notConnected"
          else:
            status = "connected"
          devices.append({
            'id': str(ObjectId(doc['_id'])),
            'status':status,
            'devSerial': doc['devSerial'],
            'maChuoi': doc['maChuoi'],
            'centralAddress': doc['otherInfo'][0]['centralAddress'],
            'phone': doc['otherInfo'][0]['phone'],
            'dateUpdate': doc['dateUpdate'],
            'date': doc['date'],
            'signalQuality': doc['otherInfo'][0]['signalQuality'],
            'dienApPin': doc['otherInfo'][0]['dienApPin']
          })
    return jsonify(devices)

@app.route('/api/testPost/table/<id>', methods=['GET'])
def getTestPostDetailTable(id):
  if request.method == 'GET':
    # Thong tin cua bo do    
    deviceInfo = db.TestPostsDetails.find_one({
      'devSerial': id,
    })
    result = deviceInfo['otherInfo']
    result[0]['tenThietBi'] = deviceInfo['maChuoi']
    result[0]['dateUpdate'] = deviceInfo['dateUpdate']
    result[0]['date'] = deviceInfo['date']
    result[0]['ACInputPower'] = deviceInfo['ACInputPower']
    result[0]['area'] = deviceInfo['area'],
    result[0]['lat'] = deviceInfo['lat'],
    result[0]['lng'] = deviceInfo['lng'],
    result[0]['organization'] = deviceInfo['organization'],
    result[0]['devSerial'] = deviceInfo['devSerial'],
    result[0]['connect']= deviceInfo['connect'],
    i = 0
    for data in result:
      data['id'] = i
      i += 1
    return jsonify(result)
  
@app.route('/api/testPost/update/<id>', methods=['POST'])
def updateTP(id):
  res = request.get_json()
  update = db.TestPostsDetails.update_one({'devSerial': id}, {"$set": {
    'maChuoi': str(res['maChuoi']),
    'date': res['date'],
    'dateUpdate': res['dateUpdate'],
    'area': res['area'],
    'lat': res['lat'],
    'lng': res['lng'],
    'ACInputPower': res['ACInputPower'],
    'organization':str(res['organization']),
    'devSerial':str(res['devSerial']),
  }})
  return 'hoan thanh', 200

@app.route('/api/testPost/delete/<id>', methods=['GET'])
def deleteTestpost(id):
  logging.info("delete Testpost")
  deviceInfo = db.TestPostsDetails.find_one({
      'devSerial': id,
  })
  deleteVar = db.RectifierTransformersDetails.update_one({'maChuoi': deviceInfo['connect']}, {'$pull':{'connect': deviceInfo['maChuoi']}}, upsert = False)
  if (len(deviceInfo['connect']) == 0):
     updateConnectRT = db.TestPostsDetails.update_one({'maChuoi': deviceInfo['connect']}, {'$push': {'connect': "Chua ket noi bo do nao!"}}, upsert = False)   
  db.TestPostsDetails.delete_one({'devSerial': id})
  return 'hoan thanh', 200

@app.route('/api/getChartPort/<id>', methods=['GET'])
def getChartPort(id):
  deviceInfo = db.TestPostsDetails.find_one({
    'devSerial': id,
  })
  portOn1 = [0,0,0,0,0,0,0,0]
  portOn2 = [0,0,0,0,0,0,0,0]
  portOn3 = [0,0,0,0,0,0,0,0]
  portOn4 = [0,0,0,0,0,0,0,0]
  time = ["chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu","chua co du lieu"]
  for i in range(min(8,len(deviceInfo['otherInfo']))):
      portOn1[i] = deviceInfo['otherInfo'][i]['openPoint1']
      portOn2[i] = deviceInfo['otherInfo'][i]['openPoint2']
      portOn3[i] = deviceInfo['otherInfo'][i]['openPoint3']
      portOn4[i] = deviceInfo['otherInfo'][i]['openPoint4']
      time[i] = deviceInfo['otherInfo'][i]['time']
  info = {
    'portOn1': portOn1,
    'portOn2': portOn2,
    'portOn3': portOn3,
    'portOn4': portOn4,
    'time': time
  }
  return jsonify(info)

########## Documents ###########
@app.route('/api/documentsList', methods=['GET'])
def getDocuments():
    documents = []
    for doc in db.Documents.find({}):
        documents.append({
          'id': str(ObjectId(doc['_id'])),
          'title': doc['title'],
          'dateCreated': doc['dateCreated'],
          'content': doc['content'],
          'link': doc['link']
        })
    return jsonify(documents)

@app.route('/api/newDocument', methods=['POST'])
def addDocuments():
  res = request.get_json()
  document = {
    "title": res["title"],
    "dateCreated": res["dateCreated"],
    "content": res["content"],
    "link": res["link"]
  }
  insertDocument = db.Documents.insert_one(document)
  return 'hoan thanh', 200

########## Map ###########

@app.route('/api/locationAllDevices', methods=['GET'])
def getLocation():
    devices = []
    for doc in db.TestPostsDetails.find({}):
      if(currentUser['role'] == 'superadmin'):
        devices.append({
          'lat': float(doc['lat']), 
          'lng': float(doc['lng']),
          'devSerial': doc['devSerial'],
          'organization': doc['organization'],
          'devType': "Bo do",
          'maChuoi':doc['maChuoi'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],         
        })
      else:
        if(doc['organization'] == currentUser['organization']):
          devices.append({
            'lat': float(doc['lat']), 
            'lng': float(doc['lng']),
            'devSerial': doc['devSerial'],
            'organization': doc['organization'],
            'devType': "Bo do",
            'maChuoi':doc['maChuoi'],
            'signalQuality': doc['otherInfo'][0]['signalQuality'],
            'dateUpdate': doc['dateUpdate'],
            'date': doc['date'],      
          })
    for doc in db.RectifierTransformersDetails.find({}):
      if(currentUser['role'] == 'superadmin'):
        devices.append({
          'lat': float(doc['lat']), 
          'lng': float(doc['lng']),
          'devSerial': doc['devSerial'],
          'organization': doc['organization'],
          'devType': "Bo trung tam",
          'maChuoi':doc['maChuoi'],  
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],           
        })
      else:
        if(doc['organization'] == currentUser['organization']):
          devices.append({
            'lat': float(doc['lat']), 
            'lng': float(doc['lng']),
            'devSerial': doc['devSerial'],
            'organization': doc['organization'],
            'devType': "Bo trung tam",
            'maChuoi':doc['maChuoi'],    
            'signalQuality': doc['otherInfo'][0]['signalQuality'],
            'dateUpdate': doc['dateUpdate'],
            'date': doc['date'],         
          })
    return jsonify(devices)

@app.route('/api/dashboardMap/', methods=['GET'])
def getDashboardMap():
  devices = []
  print(currentUser['role'])
  for doc in db.RectifierTransformersDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      devices.append({
      'id': str(ObjectId(doc['_id'])),
      'devSerial': doc['devSerial'],
      'devType': "Bo trung tam",
      'dateUpdate': doc['dateUpdate'],
      'date': doc['date'],
      'organization': doc['organization'],
      'signalQuality': doc['otherInfo'][0]['signalQuality'],
      'maChuoi': doc['maChuoi'],
      'lat': doc['lat'],
      'lng': doc['lng'],
    })
    else:
      if(doc['organization'] == currentUser['organization']):
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'devType': "Bo trung tam",
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'organization': doc['organization'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'maChuoi': doc['maChuoi'],
          'lat': doc['lat'],
          'lng': doc['lng'],
        })
  for doc in db.TestPostsDetails.find({}):
    if(currentUser['role'] == 'superadmin'):
      devices.append({
        'id': str(ObjectId(doc['_id'])),
        'devSerial': doc['devSerial'],
        'devType': "Bo do",
        'dateUpdate': doc['dateUpdate'],
        'date': doc['date'],
        'organization': doc['organization'],
        'signalQuality': doc['otherInfo'][0]['signalQuality'],
        'maChuoi': doc['maChuoi'],
        'lat': doc['lat'],
        'lng': doc['lng'],
      })
    else:
      if(doc['organization'] == currentUser['organization']):
        devices.append({
          'id': str(ObjectId(doc['_id'])),
          'devSerial': doc['devSerial'],
          'devType': "Bo do",
          'dateUpdate': doc['dateUpdate'],
          'date': doc['date'],
          'organization': doc['organization'],
          'signalQuality': doc['otherInfo'][0]['signalQuality'],
          'maChuoi': doc['maChuoi'],
          'lat': doc['lat'],
          'lng': doc['lng'],
        })
  return jsonify(devices)

if __name__ == "__main__":
    print('run App......')
    app.run(port=5000,host='0.0.0.0',ssl_context=("../../../../../etc/nginx/certs/cpsmart_net.crt", "../../../../../etc/nginx/certs/cpsmart_net.key"), threaded=True)
    uvicorn("app:app", port=5000,host='0.0.0.0')
    # app.run(port=5000,host='0.0.0.0')
    
    
