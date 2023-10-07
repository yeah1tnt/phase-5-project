import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Battle from "./Battle";
function Game({user}){
    const {characterId} = useParams();
    const [character, setCharacter] = useState('');
    const [dungeon, setDungeon] = useState('');
    const [message, setMessage] = useState('');
    const [hp, setHp] = useState(1);
    const [atk, setAtk] = useState(1);
    const [red, setRed] = useState(1);
    const [gameStart, setGameStart] = useState(false);


    useEffect(() => {
        if(user){
            fetch('/dungeonrandomizer')
            .then((r) => r.json())
            .then((r) => {
                setDungeon(r)
                console.log(r)
            })
            .catch((error) => {
                setMessage(error.message)
            })
        }
        if(user && characterId){
            fetch(`/character/${characterId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((r) => r.json())
            .then((r) => {
                setCharacter(r)
                            
            })
            .catch((error) => {
                setMessage(error.message)
            })

        }
        fetch(`/game/${characterId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }

        })
        .then((r) => r.json())
        .then((r) => {
            setMessage(r.message)
        })
        
    }, [user, characterId]);

    const handleStart = async (e) => {
        e.preventDefault();
        
        let newHp = 1
        let newAtk = 1
        let newRed = 1
        if(character.job === 'Warrior'){
            newHp = hp+(1.5*character.str)+(1.2*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex)
            newAtk = atk+(atk+(2*character.str)+(1.2*character.agi)+(1*character.vit)+(1*character.int)+(1.5*character.dex))
            newRed = red+(red+(2*character.str)+(1.5*character.agi)+(1.5*character.vit)+(1.5*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Assassin'){
            newHp =(hp+(1.2*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.2*character.dex))
            newAtk =(atk+(1.5*character.str)+(2*character.agi)+(1*character.vit)+(1*character.int)+(1.5*character.dex))
            newRed =(red+(1.5*character.str)+(2*character.agi)+(1.5*character.vit)+(1.5*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Paladin'){
            newHp =(hp+(1.5*character.str)+(1.5*character.agi)+(2.5*character.vit)+(1*character.int)+(1*character.dex))
            newAtk =(atk+(1.5*character.str)+(2*character.agi)+(2*character.vit)+(1.2*character.int)+(1*character.dex))
            newRed =(red+(1.5*character.str)+(2*character.agi)+(2*character.vit)+(1.5*character.int)+(1*character.dex))
        }
            
        if(character.job === 'Mage'){
            newHp =(hp+(1*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex))
            newAtk =(atk+(1*character.str)+(1*character.agi)+(1*character.vit)+(2*character.int)+(2*character.dex))
            newRed =(red+(1.5*character.str)+(1.5*character.agi)+(2*character.vit)+(2*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Hunter'){
            newHp =(hp+(1.5*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex))
            newAtk =(atk+(1.5*character.str)+(2*character.agi)+(1*character.vit)+(2*character.int)+(1.5*character.dex))
            newRed =(red+(1.5*character.vit)+(2*character.agi)+(2*character.int)+(1.5*character.int)+(1*character.dex))
        }
        //these somehow does not work on the first trial. changed hp:newHp istead
        setHp(newHp);
        setAtk(newAtk);
        setRed(newRed);

        let gameData = {characterId, hp:newHp, atk:newAtk, red:newRed};

        fetch(`/game/${characterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        }).then((r) => {
            if (r.ok) {
                r.json().then(() => {
                    setMessage('Successfully created game')
                    setGameStart(true)
                })
            }
            else{
                r.json().then((error) => setMessage(error.message))
            }
        })
        .catch((error) => {
            setMessage(error.message)
        })
        
    }


    return (
        <div>

            <h1>Character: {character.name}</h1>
            <h2>Dungeon: {dungeon.name}</h2>
            {!gameStart ? 
            <button onClick={handleStart}>Start</button> :
            <Battle user={user} dungeon_id={dungeon.id} character_id={characterId}></Battle>}
            

            
        </div>
    )
}

export default Game;