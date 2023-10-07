import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
function Battle({user, dungeon_id, character_id}){
    // const {dungeonId} = useParams();
    const [character, setCharacter] = useState('')
    const [monster, setMonster] = useState('')
    const [message, setMessage] = useState('')
    const [isOver, setIsOver] = useState(false)


    useEffect(() => {
        if(user){
            fetch(`/monsterrandomizer/${dungeon_id}`)
            .then((r) => r.json())
            .then((r) => {
                setMonster(r)
            })
            .catch((error) => {
                setMessage(error.message)
                
            })

        }
        if(character_id){
        fetch(`/game/${character_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },   
        })
        .then((r) => r.json())
        .then((r) => {
            setCharacter(r[r.length-1])
        })
        }
        
    }, [user, dungeon_id, character_id]);


    let monsterHp = monster.hp;
    let monsterAtk = monster.atk;
    let monsterRed = monster.red;
    let characterHp = character.hp;
    let characterAtk = character.atk;
    let characterRed = character.red;
    console.log(characterHp)
    console.log(monsterHp)

    const handleAttack = () => {
        if(!isOver){
            const minCharacterDamage = 1
            const maxCharacterDamage = Math.max(characterAtk - monsterRed, 0);

            const characterDamage = Math.floor(Math.random() * (maxCharacterDamage - minCharacterDamage + 1) + minCharacterDamage);

            const minMonsterDamage = 1
            const maxMonsterDamage = Math.max(monsterAtk - characterRed, 0);
            
            const monsterDamage = Math.floor(Math.random() * (maxMonsterDamage - minMonsterDamage + 1) + minMonsterDamage);

            const newMonsterHp = monsterHp - characterDamage;
            const newCharacterHp = characterHp - monsterDamage;

            setMonster({...monster, hp: newMonsterHp})
            setCharacter({...character, hp: newCharacterHp})
            
            if(newMonsterHp <= 0){
                setIsOver(true)
                setMessage('You won!')
            }
            else if(newCharacterHp <= 0){
                setIsOver(true)
                setMessage('You died!')
            }
        }
    }
    
    return (
        <div>
            <h1>Battle</h1>
            <p>Character HP: {character.hp}</p>
            <p>Monster: {monster.name}</p>
            <p>Hp: {monster.hp}</p>
            
            <button onClick={handleAttack} disabled={isOver}>Attack</button>
            <p>{message}</p>

        </div>
    )
}

export default Battle;