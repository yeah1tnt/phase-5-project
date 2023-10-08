
from models import db, User, Character, Monster, Dungeon, Game, Situation
from faker import Faker
from random import randint, shuffle
from app import app

fake = Faker()

with app.app_context():

    print('Delete all data')
    # User.query.delete()
    # Character.query.delete()
    Situation.query.delete()
    Monster.query.delete()
    Dungeon.query.delete()
    db.session.commit()
    print('Completed')

    print('Creating dungeon')
    for i in range(5):
        name = ['Palace', 'Forest', 'Swamp', 'Mountain', 'Cave']
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        dungeon = Dungeon(name=name[i], level=randint(5, 10), type=type[randint(0, 3)])
        name.pop()
        db.session.add(dungeon)
        db.session.commit()
    print('Completed')

    print('Creating monster')
    for i in range(300):
        name = fake.name()
        type = ['Fire', 'Ice', 'Wind', 'Earth']
        monster = Monster(name=name, type=type[randint(0, 3)], exp=randint(20, 100), hp=randint(1, 100), atk=randint(10, 50), red=randint(5, 30), dungeon_id = randint(1, len(Dungeon.query.all())))
        db.session.add(monster)
        db.session.commit()
    print('Completed')

    print('Creating situation')

    situation = 'You found an injured dragon asleep near a cave. What do you do?'
    choice_1 = 'Attack the dragon'
    choice_2 = 'Tend to its wound'
    choice_3 = 'Sneakily go pass the dragon'
    choice_4 = 'Do nothing'

    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = randint(1, len(Dungeon.query.all())))

    db.session.add(situationAdd)
    db.session.commit()

    situation = 'You found an inn, it look abandoned but you heard music inside. What do you do?'
    choice_1 = 'Go inside'
    choice_2 = 'Ignored and keep going'
    choice_3 = ''
    choice_4 = ''
    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = Dungeon.query.filter(Dungeon.name == 'Palace').first().id)
    db.session.add(situationAdd)
    db.session.commit()

    situation = 'Walking through the forest, you felt a glow in the distance. What do you do?'
    choice_1 = 'Investigate'
    choice_2 = ''
    choice_3 = ''
    choice_4 = ''
    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = Dungeon.query.filter(Dungeon.name == 'Forest').first().id)
    db.session.add(situationAdd)
    db.session.commit()

    situation = 'Within the cave, you heard chanting in the in the darkness. You recognized the language, it is an ancient lost tribe infamous for their magic. What do you do?'
    choice_1 = 'Befriend them'
    choice_2 = 'Attack them'
    choice_3 = 'Steal their magic book'
    choice_4 = ''
    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = Dungeon.query.filter(Dungeon.name == 'Cave').first().id)
    db.session.add(situationAdd)
    db.session.commit()

    situation = 'You found a treasure chest, but there are a lot of blood covering it. What do you do?'
    choice_1 = 'Open the chest'
    choice_2 = 'Attack the chest'
    choice_3 = 'Ignore'
    choice_4 = ''
    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = Dungeon.query.filter(Dungeon.name == 'Swamp').first().id)
    db.session.add(situationAdd)
    db.session.commit()

    situation = 'You reach a small house on the edge of the mountain. There is smoke coming out of the chimney. What do you do?'
    choice_1 = 'Knock on the door'
    choice_2 = 'Sneak inside'
    choice_3 = 'Break down the door'
    choice_4 = 'Scream loudly and run'

    situationAdd = Situation(situation=situation, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4, dungeon_id = Dungeon.query.filter(Dungeon.name == 'Mountain').first().id)
    db.session.add(situationAdd)
    db.session.commit()

    print('Completed')