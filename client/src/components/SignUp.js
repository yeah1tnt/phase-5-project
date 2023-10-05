import React, { useState } from 'react';


function SignUp ({setUser}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    function handleSubmit(e){
        e.preventDefault();

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    // setUser(user)
                    setMessage('Successfully created account')
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
                <h1>Sign Up</h1>
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
                <label htmlFor='password_confirmation'>Password Confirmation</label>
                <input
                    id='password_confirmation'
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <br></br>
                <button type='submit'>Submit</button>
            </form>
            {message && <p style={{ color: message.startsWith('Successfully') ? 'green' : 'red' }}>{message}</p>}

        </div>
    )

}

export default SignUp