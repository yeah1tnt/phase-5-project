import React, { useState } from 'react';

function Login({setUser}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    function handleSubmit(e){

        e.preventDefault();

        fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        .then((r) => {
                if (r.ok) {
                    r.json().then((user) => {
                        setUser(user)
                    })
                }else{
                    r.json().then((error) => setMessage(error.message))
                }
            })
        .catch((error) => {
            setMessage(error.message)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <br></br>
                <label htmlFor='password'>Password</label>&nbsp;
                <input 
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <button type='submit'>Submit</button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    )
}

export default Login
