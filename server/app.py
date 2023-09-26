from flask import request, session
from flask_restful import Resource

from config import app,db,api
from models import User

@app.route('/')
def index():
    return '<h1>Project</h1>'

class Signup(Resource):
    def post(self):
        username = request.form['username']
        password = request.form['password']

        if username and password:
            user = User(username=username)
            user.password_hash = password
            
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            return {'message': 'User created'}, 201

api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)