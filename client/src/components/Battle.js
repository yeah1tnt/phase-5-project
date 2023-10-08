import React, {useState, useEffect} from "react";

import Situation from "./Situation";

function Battle({user, dungeon_id, dungeon_level, character_id}){
    // const {dungeonId} = useParams();
    const [characterStats, setCharacterStats] = useState([])
    const [character, setCharacter] = useState('')
    const [characterExp, setCharacterExp] = useState(0)
    const [monster, setMonster] = useState('')
    const [dungeonId, setDungeonId] = useState(dungeon_id)
    const [dungeonLevel, setDungeonLevel] = useState(dungeon_level)
    const [dungeon, setDungeon] = useState('')
    const [message, setMessage] = useState('')
    
    const [battleCount, setBattleCount] = useState(0)
    const [totalBattleCount, setTotalBattleCount] = useState(0)
    const [dungeonCount, setDungeonCount] = useState(3)

    const [isOver, setIsOver] = useState(false)
    const [isLeveledUp, setIsLeveledUp] = useState(false)

    const [availablePoints, setAvailablePoints] = useState(2)
    const [allocatePts, setAllocatePts] = useState({str:0, agi:0, vit:0, int:0, dex:0})

    const [updateEffect, setUpdateEffect] = useState(false)

    const [end, setEnd] = useState(false)
    const [endSituation, setEndSituation] = useState(false)

    const [isSituation, setIsSituation] = useState(false)




    const [hp] = useState(1);
    const [atk] = useState(1);
    const [red] = useState(1);

    useEffect(() => {
        if(user){
            fetch(`/monsterrandomizer/${dungeonId}`)
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

        if(character_id){
            fetch(`/character/${character_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((r) => r.json())
            .then((r) => {
                setCharacterStats(r)
                setCharacterExp(r.exp)
            })
        }
        updateGame()
        setUpdateEffect(false)
        
    }, [user, character_id, updateEffect]);


    let monsterHp = monster.hp;
    let monsterAtk = monster.atk;
    let monsterRed = monster.red;
    let monsterExp = monster.exp;
    let characterHp = character.hp;
    let characterAtk = character.atk;
    let characterRed = character.red;

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

            setMessage(`You attacked the monster for ${characterDamage} damage. The monster attacked you for ${monsterDamage} damage.`)
            
            if(newMonsterHp <= 0){
                setIsOver(true)
                setTotalBattleCount(totalBattleCount + 1)
                setBattleCount(battleCount + 1)

                setCharacterExp(characterExp + monsterExp)
                setMessage(message + '\nYou won! \nYou gained ' + monsterExp + ' XP!')
            }
            else if(newCharacterHp <= 0){
                setIsOver(true)
                setMessage(message + '\nYou died!')
                setEnd(true)
            }
            
        }
    }
    const nextBattle = () => {
        let randomTemp = Math.floor(Math.random() * 100) + 1;
        if (randomTemp > 1){
            setIsSituation(true)
            // setIsSituation(false)
        }
        if (battleCount !== dungeonLevel){
            fetch(`/monsterrandomizer/${dungeonId}`)
            .then((r) => r.json())
            .then((r) => {
                setMonster(r)
            })
        }

        setIsOver(false)
        levelManagement()

    }

    const nextDungeon = () => {
        fetch(`/dungeonrandomizer`)
        .then((r) => r.json())
        .then((r) => {
            setDungeon(r)
            setDungeonId(r.id)
            setDungeonLevel(r.level)
        })
        setIsOver(false)
        setBattleCount(0)
        setDungeonCount(dungeonCount - 1)
    }

    const levelManagement = () => {
        if(characterExp >= 200){
            setIsLeveledUp(true)
            setCharacter({...character, level: character.level + 1})
            setCharacterExp(characterExp - 200)
        }
    }

    const handleLevelUp = () => {
        if (isLeveledUp){
            setIsLeveledUp(false)
            setAvailablePoints(3)

            const newCharacter = {...characterStats, 
                level: characterStats.level + 1,  
                exp: characterExp, 
                str: characterStats.str + allocatePts.str, 
                agi: characterStats.agi + allocatePts.agi, 
                vit: characterStats.vit + allocatePts.vit, 
                int: characterStats.int + allocatePts.int, 
                dex: characterStats.dex + allocatePts.dex
            }
            console.log(newCharacter)


            fetch(`/character/${character_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCharacter)
            })
            .then((r) => r.json())
            .then((r) => {
                setUpdateEffect(true)
                setMessage('Stat successfully updated')
            })
            .catch((error) => {
                setMessage(error.message)
            })

            setAllocatePts({
                str: 0, 
                agi: 0, 
                vit: 0, 
                int: 0, 
                dex: 0
            })

        }
    }
    const allocation = (stat, value) => {
        const temp = {...allocatePts};
        temp[stat] += value;

        if (temp[stat] >= 0 && availablePoints > 0){
            setAllocatePts(temp);
            setAvailablePoints(availablePoints - value)
        }
    }
    const deallocation = (stat) => {
        if(allocatePts[stat] > 0){
            const temp = {...allocatePts};
            temp[stat] -= 1;
            setAllocatePts(temp);
            setAvailablePoints(availablePoints + 1);
        }
    }

    const updateGame = async () => {

        let newHp = 0
        let newAtk = 0
        let newRed = 0
        if(characterStats.job === 'Warrior'){
            newHp = hp+(1.5*characterStats.str)+(1.2*characterStats.agi)+(2*characterStats.vit)+(1*characterStats.int)+(1.5*characterStats.dex)
            newAtk = atk+(2*characterStats.str)+(1.2*characterStats.agi)+(1*characterStats.vit)+(1*characterStats.int)+(1.5*characterStats.dex)
            newRed = red+(2*characterStats.str)+(1.5*characterStats.agi)+(1.5*characterStats.vit)+(1.5*characterStats.int)+(1*characterStats.dex)
        }
    
        if(characterStats.job === 'Assassin'){
            newHp =(hp+(1.2*characterStats.str)+(1.5*characterStats.agi)+(2*characterStats.vit)+(1*characterStats.int)+(1.2*characterStats.dex))
            newAtk =(atk+(1.5*characterStats.str)+(2*characterStats.agi)+(1*characterStats.vit)+(1*characterStats.int)+(1.5*characterStats.dex))
            newRed =(red+(1.5*characterStats.str)+(2*characterStats.agi)+(1.5*characterStats.vit)+(1.5*characterStats.int)+(1*characterStats.dex))
        }
    
        if(characterStats.job === 'Paladin'){
            newHp =(hp+(1.5*characterStats.str)+(1.5*characterStats.agi)+(2.5*characterStats.vit)+(1*characterStats.int)+(1*characterStats.dex))
            newAtk =(atk+(1.5*characterStats.str)+(2*characterStats.agi)+(2*characterStats.vit)+(1.2*characterStats.int)+(1*characterStats.dex))
            newRed =(red+(1.5*characterStats.str)+(2*characterStats.agi)+(2*characterStats.vit)+(1.5*characterStats.int)+(1*characterStats.dex))
        }
            
        if(characterStats.job === 'Mage'){
            newHp =(hp+(1*characterStats.str)+(1.5*characterStats.agi)+(2*characterStats.vit)+(1*characterStats.int)+(1.5*characterStats.dex))
            newAtk =(atk+(1*characterStats.str)+(1*characterStats.agi)+(1*characterStats.vit)+(2*characterStats.int)+(2*characterStats.dex))
            newRed =(red+(1.5*characterStats.str)+(1.5*characterStats.agi)+(2*characterStats.vit)+(2*characterStats.int)+(1*characterStats.dex))
        }
    
        if(characterStats.job === 'Hunter'){
            newHp =(hp+(1.5*characterStats.str)+(1.5*characterStats.agi)+(2*characterStats.vit)+(1*characterStats.int)+(1.5*characterStats.dex))
            newAtk =(atk+(1.5*characterStats.str)+(2*characterStats.agi)+(1*characterStats.vit)+(2*characterStats.int)+(1.5*characterStats.dex))
            newRed =(red+(1.5*characterStats.vit)+(2*characterStats.agi)+(2*characterStats.int)+(1.5*characterStats.int)+(1*characterStats.dex))
        }


        let gameData = {character_id, hp:newHp, atk:newAtk, red:newRed};
        console.log(gameData)
        fetch(`/game/${character_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        })
        .then((r) => r.json())
        .then((r) => {
            
        })

        
    }

    const handleEndSituation = () => {
        setIsSituation(false)
    }
    
    return (
        <div>
            <h1>Battle</h1>
            <p>Total battle: {totalBattleCount}</p>
            <p>Battle left: {dungeonLevel - battleCount}</p>

            <p>Character HP: {character.hp}</p>
            <p>Character EXP: {characterExp}</p>
            <p>Monster: {monster.name}</p>
            <p>Monster Hp: {monster.hp}</p>
            
            {!isOver ?
            <button onClick={handleAttack} disabled={isOver || isLeveledUp || isSituation}>Attack</button>:
            null
            }

            
            {isSituation ? 
            <Situation dungeon_id={dungeonId} isSituation={isSituation}></Situation> : 
            (dungeon_level - battleCount === 0 ? 
                (<button onClick={nextDungeon} disabled={!isOver}>Next dungeon</button>) : 
                (<button onClick={nextBattle} disabled={!isOver || isLeveledUp || end}>Next Battle</button>))
            }
            
            {isSituation ? <button onClick={handleEndSituation}>End Situation</button> : null}

            
            

            {isLeveledUp ? 
            <div>
                <h2>Level up</h2>
                <p>Available Pts: {availablePoints}</p>
                <p>Str: {allocatePts.str} <button onClick={()=> allocation('str',1)}>+</button><button onClick={()=> deallocation('str')}>-</button></p>
                <p>Agi: {allocatePts.agi} <button onClick={()=> allocation('agi',1)}>+</button><button onClick={()=> deallocation('agi')}>-</button></p>
                <p>Vit: {allocatePts.vit} <button onClick={()=> allocation('vit',1)}>+</button><button onClick={()=> deallocation('vit')}>-</button></p>
                <p>Int: {allocatePts.int} <button onClick={()=> allocation('int',1)}>+</button><button onClick={()=> deallocation('int')}>-</button></p>
                <p>Dex: {allocatePts.dex} <button onClick={()=> allocation('dex',1)}>+</button><button onClick={()=> deallocation('dex')}>-</button></p>

                <button onClick={handleLevelUp}>Level up</button>
            </div>: 
            
            null}
            
            <pre>{message}</pre>
            
        </div>

        
    )
}

export default Battle;