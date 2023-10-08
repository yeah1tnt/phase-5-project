from flask import request, session
from flask_restful import Resource

from config import app,db,api
from models import User, Character, Monster, Dungeon, Game, Situation

import random

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

    # def get(self):
    #     if not session['user_id']:
    #         return {'message': 'Not authorized'}, 401
    #     user_id = session['user_id']
    #     character = Character.query.filter_by(user_id=user_id).all()
    #     if not character:
    #         return {'message': 'No characters found'}, 404

    #     character_dict = [character.to_dict() for character in character]
    #     print(character_dict)
    #     return character_dict, 200
    
    def get(self, character_id = None):
        if character_id == None:
            if not session['user_id']:
                return {'message': 'Not authorized'}, 401
            user_id = session['user_id']
            character = Character.query.filter_by(user_id=user_id).all()
            if not character:
                return {'message': 'No characters found'}, 404

            character_dict = [character.to_dict() for character in character]
            print(character_dict)
            return character_dict, 200
        
        character = Character.query.filter_by(id=character_id).first()
        character_dict = character.to_dict()
        print(character_dict)
        if not character:
            return {'message': 'Character not found'}, 404
        
        return character_dict, 200
    
    def put(self, character_id):
        data = request.get_json()

        character = Character.query.filter_by(id=character_id).first()
        
        character.exp = data.get('exp')
        character.level = data.get('level')

        character.str = data.get('str')
        character.agi = data.get('agi')
        character.vit = data.get('vit')
        character.int = data.get('int')
        character.dex = data.get('dex')

        db.session.commit()

        return character.to_dict(), 200


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

class DungeonGet(Resource):
    def get(self):
        dungeon = Dungeon.query.all()
        dungeon_dict = [dungeon.to_dict() for dungeon in dungeon]
        print(dungeon_dict)
        return dungeon_dict, 200
    

class MonsterGet(Resource):
    def get(self):
        monster = Monster.query.all()
        monster_dict = [monster.to_dict() for monster in monster]
        print(monster_dict)
        return monster_dict, 200
    

class DungeonRandomizer(Resource):
    def get (self):
        randomDungeon = random.choice(Dungeon.query.all())
        print(randomDungeon.to_dict())
        if randomDungeon:
            return randomDungeon.to_dict(), 200
        else:
            return {'message': 'No dungeon or monster found'}, 404

class MonsterRandomizer(Resource):
    def get (self, dungeon_id):
        randomMonster = random.choice(Monster.query.filter_by(dungeon_id=dungeon_id).all())
        print(randomMonster.to_dict())
        if randomMonster:
            return randomMonster.to_dict(), 200
        else:
            return {'message': 'No monster found'}, 404

class GameUpdate(Resource):

    def get(self, character_id):
        game = Game.query.filter_by(character_id=character_id).all()
        if not game:
            return {'message': 'Game not found'}, 404
        
        game_dict = [game.to_dict() for game in game]
        print(game_dict)
        return game_dict, 200
    
    def put(self, character_id):
        data = request.get_json()

        game = Game.query.filter_by(character_id=character_id).first()

        game.hp = data.get('hp')
        game.atk = data.get('atk')
        game.red = data.get('red')
        db.session.commit()

        return game.to_dict(), 200
        

    def post(self, character_id):
        data = request.get_json()
        hp = data.get('hp')
        atk = data.get('atk')
        red = data.get('red')
        
        game = Game(character_id=character_id, hp=hp, atk=atk, red = red)
        game_dict = game.to_dict()
        print(game_dict)
        db.session.add(game)
        db.session.commit()

        return game_dict, 201
    
    def delete(self, character_id):
        game = Game.query.filter_by(character_id=character_id).all()
        if not game:
            return {'message': 'Game not found'}, 404
        
        for game in game:
            db.session.delete(game)
        db.session.commit()
        return {'message': 'Game deleted'}, 200
    
class SituationList(Resource):
    def get(self, dungeon_id=None):
        if dungeon_id == None:
            situation = Situation.query.all()
            situation_dict = [situation.to_dict() for situation in situation]
            print(situation_dict)
            return situation_dict, 200
        if dungeon_id:
            situation = Situation.query.filter_by(dungeon_id=dungeon_id).all()
            situation_dict = [situation.to_dict() for situation in situation]
            print(situation_dict)
            return situation_dict, 200
        else:
            return {'message': 'No situation in dungeon'}, 404
    



api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(CharacterOption, '/character', '/character/<int:character_id>', endpoint='character')
api.add_resource(DungeonGet, '/dungeon', endpoint='dungeon')
api.add_resource(MonsterGet, '/monster', endpoint='monster')
api.add_resource(DungeonRandomizer, '/dungeonrandomizer', endpoint='dungeon_randomizer')
api.add_resource(MonsterRandomizer, '/monsterrandomizer/<int:dungeon_id>', endpoint='monster_randomizer')
api.add_resource(GameUpdate, '/game/<int:character_id>', endpoint='game')
api.add_resource(SituationList, '/situation', '/situation/<int:dungeon_id>', endpoint='situation')

if __name__ == '__main__':
    app.run(port=5555, debug=True)