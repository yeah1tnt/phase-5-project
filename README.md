# phase-5-project




### Logs
<details>
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
```python
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

```python

<input
    id='username'
    type='text'
    value={username}
    onChange={(e) => setUsername(e.target.value.toLowerCase())}
/>

```

7 - Working on Login, logout and checksession. Login is put into home, if user is not logged in, Login page will be present. The user has to log in with the correct log in to continue. When sucessfully log in, it will welcome the user and a log out button will be present.

```python
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
```python
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


10 - Making dungeon, monster, and updated character models. Seed.py updated to generate random dungeon and monster. Added logic to calculate hp, atk and def.

11 - Spent a long time trying to find out why Dungeon and Monster can't pull Query, models and app.py had the same class, changed to DungeonGet and MonsterGet instead. useParams to pull character id for Game.js

12 - Troubleshoot and brainstorming how to keep gameUpdated. Kinda tuned Game.js, start button would calculate stat of character and put it in game session.

13 - Create battle.js. Randomize monster in that the dungeon picked when character is chosen. Damage calculation for both character and monster.

14 - After defeating a monster. The character will gain exp. This exp will be added to the character.exp and a logic to level them up should be in place. 
Added new dungeon when all level in a dungeon is gone.
When character reach a certain xp, level up screen will pop up to choose 3 stats to level up.

</details>