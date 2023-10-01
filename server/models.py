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