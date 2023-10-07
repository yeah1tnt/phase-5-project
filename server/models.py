from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    characters = db.relationship('Character', backref='users')

    @hybrid_property
    def password_hash(self):
        raise Exception('You cannot get the password hash')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password_hash': self._password_hash
        }

    def __repr__(self):
        return '<User {}>'.format(self.username)
    

    
class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    job = db.Column(db.String, nullable=False)
    exp = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)

    str = db.Column(db.Integer, nullable=False)
    agi = db.Column(db.Integer, nullable=False)
    vit = db.Column(db.Integer, nullable=False)
    int = db.Column(db.Integer, nullable=False)
    dex = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    game = db.relationship('Game', backref='characters')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'job': self.job,
            'exp': self.exp,
            'level': self.level,

            'str': self.str,
            'agi': self.agi,
            'vit': self.vit,
            'int': self.int,
            'dex': self.dex,
            'user_id': self.user_id
        }
    
    def __repr__(self):
        return '<Character {}>'.format(self.name)

class Dungeon(db.Model, SerializerMixin):
    __tablename__ = 'dungeons'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String, nullable=False)

    monsters = db.relationship('Monster', backref='dungeons')

    def __repr__(self):
        return '<Dungeon {}>'.format(self.name)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'level': self.level
        }
    
class Monster(db.Model, SerializerMixin):
    __tablename__ = 'monsters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    exp = db.Column(db.Integer, nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    atk = db.Column(db.Integer, nullable=False)
    red = db.Column(db.Integer, nullable=False)

    dungeon_id = db.Column(db.String, db.ForeignKey('dungeons.id'))

    def __repr__(self):
        return '<Monster {}>'.format(self.name)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'exp': self.exp,
            'hp': self.hp,
            'atk': self.atk,
            'red': self.red
        }
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    hp = db.Column(db.Integer, nullable=False)
    atk = db.Column(db.Integer, nullable=False)
    red = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Game {}>'.format(self.id)
    
    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'hp': self.hp,
            'atk': self.atk,
            'red': self.red
        }