import React, { useState, useEffect } from "react";

function CharacterList({user}){
    const [characters, setCharacters] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(user){
            fetch('/character', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'user_id': user.id,
                },
            })
            .then((r) => r.json())
            .then((r) => {
                setCharacters(r)                
            })
            .catch((error) => {
                setMessage(error.message)
            })

        }
    }, [user]);

    const deleteCharacter = (id) => {
        fetch(`/character/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                user_id: user.id,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            setCharacters((prev) => prev.filter((character) => character.id !== id))
            setMessage(r.message)
        })
        .catch((error) => {
            setMessage(error.message)
        })
    }

    if(!user) {
        return (
            <div>
                <h1>Your Characters</h1>
                <ul>
                    {characters.map((character) => (
                        <p key={character.id}>
                            {character.name} <button onClick={() => deleteCharacter(character.id)}>Delete</button>
                        </p>
                    ))}
                </ul>
                {message}

            </div>
        )
    }else{
        return (
            <div>
                <h1>Your Characters</h1>
                <p>You don't have a character, please create one</p>
            </div>
        )

    }
}

export default CharacterList