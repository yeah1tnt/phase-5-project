from models import db, User, Character, Monster, Dungeon
from faker import Faker
from random import randint
from app import app

fake = Faker()

with app.app_context():

    print('Delete all data')
    User.query.delete()
    Character.query.delete()
    Monster.query.delete()
    Dungeon.query.delete()
    db.session.commit()
    print('Completed')

    print('Creating dungeon')
    for i in range(5):
        name = fake.place()
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        dungeon = Dungeon(name=name, level=randint(5, 10), type=type[randint(0, 3)])
        db.session.add(dungeon)
        db.session.commit()
    print('Completed')

    print('Creating monster')
    for i in range(10):
        name = fake.name()
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        monster = Monster(name=name, type=type[randint(0, 3)], exp=randint(5, 100), hp=randint(1, 100), atk=randint(1, 10), def_=randint(1, 10))
        db.session.add(monster)
        db.session.commit()
    print('Completed')
