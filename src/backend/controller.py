from flask import Flask, render_template, request, session, jsonify
from configDB import db

res = {}

def login():
    loginData = request.get_json()
    user = db.User.find_one({'username': loginData['username']})
    if user and user['password'] == loginData['password']:
        res['username'] = user['username']
        res['role'] = user['role']
        res['organization'] = user['organization']
        res['address'] = user['address']
        res['phone'] = user['phone']
        res['email'] = user['email']
        res['name'] = user['name']
        return jsonify(res), 200
    else:
        return 'ten dang nhap va mat khau sai', 404