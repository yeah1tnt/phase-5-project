import React, {useState, useEffect} from "react";

function Battle({user, dungeon_id, dungeon_level, character_id}){
    // const {dungeonId} = useParams();
    const [character, setCharacter] = useState('')
    const [monster, setMonster] = useState('')
    const [dungeonId, setDungeonId] = useState(dungeon_id)
    const [dungeonLevel, setDungeonLevel] = useState(dungeon_level)
    const [dungeon, setDungeon] = useState('')
    const [message, setMessage] = useState('')
    const [isOver, setIsOver] = useState(false)
    const [battleCount, setBattleCount] = useState(0)
    const [totalBattleCount, setTotalBattleCount] = useState(0)
    const [dungeonCount, setDungeonCount] = useState(3)


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
        
    }, [user, character_id]);


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

            setMessage(`You attacked the monster for ${characterDamage} damage. The monster attacked you for ${monsterDamage} damage.`)
            
            if(newMonsterHp <= 0){
                setIsOver(true)
                setTotalBattleCount(totalBattleCount + 1)
                setBattleCount(battleCount + 1)
                setMessage(message + '\nYou won!')
            }
            else if(newCharacterHp <= 0){
                setIsOver(true)
                setMessage(message + '\nYou died!')
            }

            
        }
    }

    const nextBattle = () => {
        if (battleCount !== dungeonLevel){
            fetch(`/monsterrandomizer/${dungeonId}`)
            .then((r) => r.json())
            .then((r) => {
                setMonster(r)
            })
        }

        setIsOver(false)

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
    
    return (
        <div>
            <h1>Battle</h1>
            <p>Total battle: {totalBattleCount}</p>
            <p>Battle left: {dungeonLevel - battleCount}</p>

            <p>Character HP: {character.hp}</p>
            <p>Monster: {monster.name}</p>
            <p>Hp: {monster.hp}</p>
            
            
            <button onClick={handleAttack} disabled={isOver}>Attack</button>
            {dungeon_level - battleCount === 0 ? 
            <button onClick={nextDungeon} disabled={!isOver}>Next dungeon</button> : 
            <button onClick={nextBattle} disabled={!isOver}>Next Battle</button>}
            
            
            <pre>{message}</pre>

        </div>
    )
}

export default Battle;