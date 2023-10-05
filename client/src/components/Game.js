import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Game({user}){
    const {characterId} = useParams();
    const [character, setCharacter] = useState('');
    const [dungeon, setDungeon] = useState('');
    const [monster, setMonster] = useState('');
    const [message, setMessage] = useState('');
    const [hp, setHp] = useState(0);
    const [atk, setAtk] = useState(0);
    const [_def, setDef] = useState(0);


    useEffect(() => {
        if(user){
            fetch('/randomizer')
            .then((r) => r.json())
            .then((r) => {
                setDungeon(r.dungeon)
                setMonster(r.monster)
            })
            .catch((error) => {
                setMessage(error.message)
            })
        }
        if(characterId){
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
    }, [user, characterId]);
    const handleStart = (e) => {
        e.preventDefault();

        if(character.job === 'Warrior'){
            setHp(hp+(1.5*character.str)+(1.2*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex))
            setAtk(atk+(2*character.str)+(1.2*character.agi)+(1*character.vit)+(1*character.int)+(1.5*character.dex))
            setDef(_def+(2*character.str)+(1.5*character.agi)+(1.5*character.vit)+(1.5*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Assassin'){
            setHp(hp+(1.2*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.2*character.dex))
            setAtk(atk+(1.5*character.str)+(2*character.agi)+(1*character.vit)+(1*character.int)+(1.5*character.dex))
            setDef(_def+(1.5*character.str)+(2*character.agi)+(1.5*character.vit)+(1.5*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Paladin'){
            setHp(hp+(1.5*character.str)+(1.5*character.agi)+(2.5*character.vit)+(1*character.int)+(1*character.dex))
            setAtk(atk+(1.5*character.str)+(2*character.agi)+(2*character.vit)+(1.2*character.int)+(1*character.dex))
            setDef(_def+(1.5*character.str)+(2*character.agi)+(2*character.vit)+(1.5*character.int)+(1*character.dex))
        }
            
        if(character.job === 'Mage'){
            setHp(hp+(1*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex))
            setAtk(atk+(1*character.str)+(1*character.agi)+(1*character.vit)+(2*character.int)+(2*character.dex))
            setDef(_def+(1.5*character.str)+(1.5*character.agi)+(2*character.vit)+(2*character.int)+(1*character.dex))
        }
    
        if(character.job === 'Hunter'){
            setHp(hp+(1.5*character.str)+(1.5*character.agi)+(2*character.vit)+(1*character.int)+(1.5*character.dex))
            setAtk(atk+(1.5*character.str)+(2*character.agi)+(1*character.vit)+(2*character.int)+(1.5*character.dex))
            setDef(_def+(1.5*character.vit)+(2*character.agi)+(2*character.int)+(1.5*character.int)+(1*character.dex))
        }

        fetch(`/game/${characterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
    }
    


    return (
        <div>
            <h1>Game Start</h1>
            <button>Start</button>
            <h2>Dungeon: {dungeon.name}</h2>
            <h2>Monster: {monster.name}</h2>

            {message}

        </div>
    )
}

export default Game;