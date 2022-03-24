from flask import Flask, render_template, request, session, jsonify
from configDB import db

currentUser = {}

def login():
    loginData = request.get_json()
    user = db.User.find_one({'username': loginData['username']})
    if user and user['password'] == loginData['password']:
        currentUser['id'] = str(user['_id'])
        currentUser['username'] = user['username']
        currentUser['role'] = user['role']
        currentUser['organization'] = user['organization']
        currentUser['address'] = user['address']
        currentUser['phone'] = user['phone']
        currentUser['email'] = user['email']
        currentUser['name'] = user['name']
        return jsonify(currentUser), 200
    else:
        return "failed to login", 203

