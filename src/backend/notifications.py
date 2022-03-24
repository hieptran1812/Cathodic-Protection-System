from configDB import db
from flask import jsonify, request
from bson import ObjectId

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