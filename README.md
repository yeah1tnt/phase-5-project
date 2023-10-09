# Yealt's Simulated Universe

## Overview

I have been playing a lot of Baldur's Gate and Honkai: Star Rail (and still do) so I decided to have my project around character building.

This project is a game where user can make their own account and log in. Only character created by the users can be use and other users cannot see other people's character.

Character enter different dungeon and battle through different enemy, levelling up and making different choices with different situation

## Installation

You will need to install python environment and react
```
pipenv install
npm install --prefix client
```

To run the project. In console type in the following command to start up the front end. Open up app.py to start up the backend.

```
npm start --prefix client
```

## Logs



<details>

```
├── LICENSE
├── Pipfile
├── Pipfile.lock
├── README.md
├── client
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
│       ├── App.css
│       ├── components
│       │   ├── App.js
│       │   ├── Battle.js
│       │   ├── Character.js
│       │   ├── CharacterList.js
│       │   ├── Game.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── SignUp.js
│       │   └── Situation.js
│       ├── index.css
│       └── index.js
└── server
    ├── __pycache__
    ├── app.py
    ├── config.py
    ├── instance
    ├── migrations
    ├── models.py
    └── seed.py
```

1 - Install python environment based on project template

```
pipenv install flask flask-sqlalchemy flask-migrate sqlalchemy-serializer flask-restful flask-cors faker
```


2 - Create server folder, create 4 files to match template. Run 
```python
npx create-react-app- client --use-npm
```
for client folder, create react environment. PORT=4000 for scripts start.

3 - Setting up users login first, ```pipenv install flask_bcrypt``` to encrypt password. Set up models for Users and initialized the database.
```
flask db init
flask db revision --autogenerate -m"message"
flask db upgrade
```

4 - Worked on Frontend, needed to install router-dom due to error at homepage. cd into clients to install or --prefix client at end
```python
npm install react-router-dom
```

5 - Worked on Signup page. Write user/password form. Testing, removed role. Added   ```"proxy": "http://localhost:5555"``` to package.json

6 - Found an issue where username can be the same with different capitalized letter, changed this line by adding ```toLowerCase()```. This disable the user to be able to use Capitalize letter in username when signing up
Added delete all user for seed.py

```jsx

<input
    id='username'
    type='text'
    value={username}
    onChange={(e) => setUsername(e.target.value.toLowerCase())}
/>

```

7 - Working on Login, logout and checksession. Login is put into home, if user is not logged in, Login page will be present. The user has to log in with the correct log in to continue. When sucessfully log in, it will welcome the user and a log out button will be present.

```jsx
if (user) {
        return (
            <div><h2>Welcome {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }else{
        return <Login setUser={setUser}></Login>
    }
```

8 - Set up character database and create Character.js for character creation. Hardest part was the button, tried to make every 5+ stat consume 2 pts, but unable to get the logic right. Gave up for the night and decided with this. Button increase stat, set stat and form will submit all values when they are ready. None of value can be null.
```jsx
    const increaseStat = (stat, setStat) => {
        if (points > 0) {
          setStat((prev) => prev + 1);
          setPoints((prev) => prev - 1);
        }
    };
    
      const decreaseStat = (stat, setStat) => {
        if (stat > 1) {
          setStat((prev) => prev - 1);
          setPoints((prev) => prev + 1);
        }
    };
```

9 - Now that the character is created. I want to make a list of character created by the logged in character, and give them the option to delete them/choose them for the game.

Made CharacterList, but for some reason it was pulling /character/ from port 4000 instead of 5555. After hours of troubleshooting and changing code. found that ```fetch('/character')``` and ```fetch(/character/) ``` are 2 different things.
Created delete function to delete existing character.
Tested different users, users that has no character caused an error with character.map, made condition to ask user to create their character first.
Using some condition like these for get method when no parameter/argument are passed through.

```python

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
```
If no characterID is passed through, it would return everything, and api route is also different.

```python
    api.add_resource(CharacterOption, '/character', '/character/<int:character_id>', endpoint='character')
```

10 - Making dungeon, monster, and updated character models. Seed.py updated to generate random dungeon and monster. Added logic to calculate hp, atk and def.

11 - Spent a long time trying to find out why Dungeon and Monster can't pull Query, models and app.py had the same class, changed to DungeonGet and MonsterGet instead. useParams to pull character id for Game.js

12 - Troubleshoot and brainstorming how to keep gameUpdated. Kinda tuned Game.js, start button would calculate stat of character and put it in game session.

13 - Create battle.js. Randomize monster in that the dungeon picked when character is chosen. Damage calculation for both character and monster.

14 - After defeating a monster. The character will gain exp. This exp will be added to the character.exp and a logic to level them up should be in place. 
Added new dungeon when all level in a dungeon is gone.
When character reach a certain xp, level up screen will pop up to choose 2 stats to level up.
Learned to use a lot of condition to have the page only showing certain thing for example

```jsx
        {isSituation ? 
            <Situation dungeon_id={dungeonId} isSituation={isSituation}></Situation> : 
            (dungeon_level - battleCount === 0 ? 
                (<button onClick={nextDungeon} disabled={!isOver}>Next dungeon</button>) : 
                (<button onClick={nextBattle} disabled={!isOver || isLeveledUp || end}>Next Battle</button>))
            }
            
        {isSituation ? <button onClick={handleEndSituation}>Continue</button> : null}
```

15 - Adding Situation table, with 4 different choices. Situation probably can't be seeded randomly, so will make some custom one that aren't too complicated. Each dungeon will have situation based on their location.

16 - Set up Situation.js. Created choices and scenerios for each choices. This will hold all encounter. Currently did not have enough time to actually change the stat, make equipment or special skills.

</details>