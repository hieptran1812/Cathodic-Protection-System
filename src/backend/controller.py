from flask import Flask, render_template, request, session, jsonify
from configDB import db

def login():
    loginData = request.get_json()
    user = db.User.find_one({'username': loginData['username']})
    if user and user['password'] == loginData['password']:
        # print(user)
        return str(user['role']), 200
    else:
        return 'ten dang nhap va mat khau sai', 404