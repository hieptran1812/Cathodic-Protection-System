from configDB import db
from flask import jsonify
from bson import ObjectId

def getNumberOfNoti():
    return str(db.Notifications.count({"status": "notResponse"}))
    # count = 0
    # for doc in db.Notifications.find({}):
    #     if doc['status'] == "notResponse":
    #         count += 1
    # return jsonify({
    #     'count': count
    # })

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