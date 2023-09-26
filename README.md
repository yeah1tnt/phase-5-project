# phase-5-project




### Logs
<details>
1 - Install python environment based on project template

```
pipenv install flask flask-sqlalchemy flask-migrate sqlalchemy-serializer flask-restful flask-cors faker
```


2 - Create server folder, create 4 files to match template. Run 
```
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
```
npm install react-router-dom
```

5 - Worked on Signup page. Write user/password form. 
</details>