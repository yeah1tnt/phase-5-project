
from models import db, User, Character, Monster, Dungeon
from faker import Faker
from random import randint
from app import app

fake = Faker()

with app.app_context():

    print('Delete all data')
    #User.query.delete()
    Character.query.delete()
    Monster.query.delete()
    Dungeon.query.delete()
    db.session.commit()
    print('Completed')

    print('Creating dungeon')
    for i in range(5):
        name = ['Palace', 'Forest', 'Swamp', 'Mountain', 'Cave']
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        dungeon = Dungeon(name=name[randint(0, 4)], level=randint(5, 10), type=type[randint(0, 3)])
        db.session.add(dungeon)
        db.session.commit()
    print('Completed')

    print('Creating monster')
    for i in range(100):
        name = fake.name()
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        monster = Monster(name=name, type=type[randint(0, 3)], exp=randint(10, 100), hp=randint(1, 100), atk=randint(5, 30), red=randint(1, 10), dungeon_id = randint(1, len(Dungeon.query.all())))
        db.session.add(monster)
        db.session.commit()
    print('Completed')
