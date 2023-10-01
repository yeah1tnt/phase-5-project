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
    
class CharacterOption(Resource):

    def get(self):
        if not session['user_id']:
            return {'message': 'Not authorized'}, 401
        user_id = session['user_id']
        character = Character.query.filter_by(user_id=user_id).all()
        if not character:
            return {'message': 'No characters found'}, 404

        character_dict = [character.to_dict() for character in character]
        print(character_dict)
        return character_dict, 200
    
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

class CharacterDelete(Resource):
    def delete(self, character_id):
        character = Character.query.filter_by(id=character_id).first()
        if not character:
            return {'message': 'Character not found'}, 404
        
        if character.user_id == session['user_id']:
            db.session.delete(character)
            db.session.commit()
            return {'message': 'Character deleted'}, 200
        else:
            return {'message': 'Not authorized'}, 401



api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(CharacterOption, '/character', endpoint='character')
api.add_resource(CharacterDelete, '/character/<int:character_id>', endpoint='character_delete')


if __name__ == '__main__':
    app.run(port=5555, debug=True)