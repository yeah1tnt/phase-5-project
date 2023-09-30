import React, { useState } from "react";


function Character({user, setUser}){
    const pointsLimit = 20

    const [name, setName] = useState('');
    const [job, setJob] = useState('Warrior');
    const exp = 0;
    const level = 1;
    const [str, setStr] = useState(1);
    const [agi, setAgi] = useState(1);
    const [vit, setVit] = useState(1);
    const [int, setInt] = useState(1);
    const [dex, setDex] = useState(1);
    const [points, setPoints] = useState(pointsLimit);
    const [message, setMessage] = useState('');

   
    const increaseStat = (stat, setStat) => {
        if (points > 0) {
          setStat((prev) => prev + 1);
          setPoints((prev) => prev - 1);
        }
    };
    
      const decreaseStat = (stat, setStat) => {
        if (stat > 1) {
          setStat((prev) => prev - 1);
          setPoints((prev) => prev + 1);
        }
    };
    function handleSubmit(e){
        e.preventDefault();

        const characterData = {name, job, exp, level, str, agi, vit, int, dex, user_id: user.id};

        fetch('/character', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
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

    return(
        <div>
            <h1>Create your character</h1>
            <p className='AvailablePoints'> Available Points: {points}</p>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            <br></br>
            <label htmlFor='job'>Job</label>
            <select id='job' value={job} onChange={(e) => setJob(e.target.value)}>
                <option value = 'Warrior'>Warrior</option>
                <option value = 'Assassin'>Assassin</option>
                <option value = 'Paladin'>Paladin</option>
                <option value = 'Mage'>Mage</option>
                <option value = 'Hunter'>Hunter</option>
            </select>
            <div>
                <div>
                    <p>Strength: {str}
                    <button onClick={() => increaseStat(str, setStr)}>+</button>
                    <button onClick={() => decreaseStat(str, setStr)}>-</button>
                    </p>
                </div>
                <div>
                    <p>Agility: {agi}
                    <button onClick={() => increaseStat(agi, setAgi)}>+</button>
                    <button onClick={() => decreaseStat(agi, setAgi)}>-</button>
                    </p>
                </div>
                <div>
                    <p>Vitality: {vit}
                    <button onClick={() => increaseStat(vit, setVit)}>+</button>
                    <button onClick={() => decreaseStat(vit, setVit)}>-</button>
                    </p>
                </div>
                <div>
                    <p>Intelligence: {int}
                    <button onClick={() => increaseStat(int, setInt)}>+</button>
                    <button onClick={() => decreaseStat(int, setInt)}>-</button>
                    </p>
                </div>
                <div>
                    <p>Dexterity: {dex}
                    <button onClick={() => increaseStat(dex, setDex)}>+</button>
                    <button onClick={() => decreaseStat(dex, setDex)}>-</button>
                    </p>
                </div>
            </div>
            <button type='submit' onClick={handleSubmit}>Create Character</button>
            <p>{message}</p>
        </div>
    )
}

export default Character