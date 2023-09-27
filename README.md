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
</details>