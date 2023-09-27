from models import db, User
from faker import Faker
from app import app

fake = Faker()

with app.app_context():

    print('Delete all users')
    User.query.delete()
    db.session.commit()
    print('Completed')