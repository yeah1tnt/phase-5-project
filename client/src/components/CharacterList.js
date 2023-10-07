import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

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
    return (
        <div>
            <h1>Your Characters</h1>
            {characters.length > 0 ?
                (<ul>
                    {characters.map((character) => (
                        <p key={character.id}>
                            {character.name} 
                            <Link to={`/game/${character.id}`}><button>Choose</button></Link>
                            <button onClick={() => deleteCharacter(character.id)}>Delete</button>
                        </p>
                    ))}
                </ul>): <p>You have no characters. Please create one</p>}
                {message}
        </div>
        )
}

export default CharacterList