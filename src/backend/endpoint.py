from flask import Flask, jsonify, request
from flask_pymongo import pymongo
from flask_cors import CORS
from testSocket import getDataFromTestPost, getDataFromRectifier
from configDB import db
import json

from bson import ObjectId

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def t():
  return "ok"

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
        '_id': str(ObjectId(doc['_id'])),
        'name': doc['name'],
        'email': doc['email'],
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


# ################ trung tam ##################
# @app.route('/newRectifier', methods=['POST'])
# def createRectifier():
#   print(request.json)
#   id = db.insert({
#     'name': request.json['name'],
#     'email': request.json['email'],
#     'password': request.json['password']
#   })
#   return jsonify(str(ObjectId(id)))


@app.route('/api/rectifierTransformer/1', methods=['GET'])
def getRectifierTransformerDetail():
  if request.method == 'GET':
    return jsonify(getDataFromRectifier())

# @app.route('/rectifierTransformer/<id>', methods=['GET'])
# def getRectifierDetail(id):
#   user = db.find_one({'_id': ObjectId(id)})
#   print(user)
#   return jsonify({
#       '_id': str(ObjectId(user['_id'])),
#       'name': user['name'],
#       'email': user['email'],
#       'password': user['password']
#   })

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
    app.run(host='0.0.0.0', port=5000, debug=True)
