from flask import Flask, render_template, request, session
from configDB import db

def signout():
    session.pop('logged_in', None)
    # return redirect('/')

def login():
    loginData = request.get_json()
    user = db.User.find_one({'username': loginData['username']})
    # print(loginData['password'])
    if user and user['password'] == loginData['password']:
        print('ok')
        # session['logged_in'] = True
        # print(session['logged_in'])
        print(user)
        # session['username'] = loginData['username']
        if user['role'] == 'superAdmin':
            return 200
        elif user['role'] == 'admin':
            print('200 r nha')
            return 200
        elif user['role'] == 'viewer':
            return 'dang nhap thanh cong', 200
    else:
        return 'ten dang nhap va mat khau sai', 404