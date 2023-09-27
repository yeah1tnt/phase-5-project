import React, { useState } from 'react';
import Login from './Login';

function Home({user, setUser}) {
    
    function handleLogout(){
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }

    if (user) {
        return (
            <div><h2>Welcome {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }else{
        return <Login setUser={setUser}></Login>
    }
}

export default Home;