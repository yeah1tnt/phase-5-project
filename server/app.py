from flask import request, session
from flask_restful import Resource

from config import app,db,api
from models import User, Character

@app.route('/')
def index():
    return '<h1>Project</h1>'

class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = User(username=username)
            user.password_hash = password
            
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            return user.to_dict(), 201

        return {'message': 'Bad Request'}, 400

class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 201
            
        return {'message': 'Bad Request'}, 400
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            user_dict = user.to_dict()

            return user_dict, 201
        
        return {'message': 'Bad Request'}, 400
    
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logged out'}, 200
    
class CharacterAdd(Resource):
    def post(self):
        data = request.get_json()

        name = data.get('name')
        job = data.get('job')
        exp = data.get('exp')
        level = data.get('level')
        str = data.get('str')
        agi = data.get('agi')
        vit = data.get('vit')
        int = data.get('int')
        dex = data.get('dex')

        character = Character(name=name, job=job, exp=exp, level=level, str=str, agi=agi, vit=vit, int=int, dex=dex, user_id=session['user_id'])
        character_dict = character.to_dict()
        db.session.add(character)
        db.session.commit()

        return character_dict, 201

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(CharacterAdd, '/character', endpoint='character')

if __name__ == '__main__':
    app.run(port=5555, debug=True)