from configDB import db
from flask import jsonify, request
from bson import ObjectId
import datetime

def getNumberOfNoti():
    return jsonify({
        'count': str(db.Notifications.count({"status": "notResponse"}))
    })

def getNotifications():
    notifications = []
    for doc in db.Notifications.find({}):
        notifications.append({
          'id': str(ObjectId(doc['_id'])),
          'title': doc['title'],
          'dateCreated': doc['dateCreated'],
          'organization': doc['organization'],
          'name': doc['name'],
          'username': doc['username'],
          'email': doc['email'],
          'phone': doc['phone'],
          'address': doc['address'],
          'notes': doc['note'],
          'status': doc['status'],
        })
    return jsonify(notifications)

def editStatusNoti():
  res = request.get_json()
  # print(res['id'])
  if res['status'] =='notResponse':
    update = db.Notifications.update_one({'_id': ObjectId(res['id'])}, {"$set": {
      'status': "response",
    }})
  else: 
    update = db.Notifications.update_one({'_id': ObjectId(res['id'])}, {"$set": {
      'status': "notResponse",
    }})
  return 'hoan thanh', 200

def forgotPassword():
  res = request.get_json()
  info = {
    'title': "Quen mat khau",
    'dateCreated': datetime.datetime.now(),
    'organization': res['organization'],
    'name': res['name'],
    'username': res['username'],
    'email': res['email'],
    'phone': res['phone'],
    'address': res['address'],
    'note': res['note'],
    'status': "notResponse"
  }
  insertInfo = db.Notifications.insert_one(info)
  return 'hoan thanh', 200

def signUp():
  res = request.get_json()
  info = {
    'title': "Dang ky",
    'dateCreated': datetime.datetime.now(),
    'organization': res['organization'],
    'name': res['name'],
    'username': res['username'],
    'email': res['email'],
    'phone': res['phone'],
    'address': res['address'],
    'note': res['note'],
    'status': "notResponse"
  }
  insertInfo = db.Notifications.insert_one(info)
  return 'hoan thanh', 200