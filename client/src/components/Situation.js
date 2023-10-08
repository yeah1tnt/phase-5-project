import React, { useState, useEffect } from "react";
import Game from "./Game";
import Battle from "./Battle";

function Situation({dungeon_id, isSituation}){
    const [situation, setSituation] = useState('');
    const [choice, setChoice] = useState(1);
    const [dungeon, setDungeon] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(dungeon_id){
            fetch(`/situation/${dungeon_id}`)
            .then((r) => r.json())
            .then((r) => {
                setSituation(r)
                console.log(r)
            })
            .catch((error) => {
                setMessage(error.message)
            })
        }
    }, [dungeon_id]);

    const handleChoice = (e) => {
        e.preventDefault();

        isSituation = false;
    }


    return (
        <div>
            <h1>Test</h1>
            <h2>{situation.situation}</h2>
            <h3>1: {situation.choice_1}</h3>
            <h3>2: {situation.choice_2}</h3>
            <h3>3: {situation.choice_3}</h3>
            <h3>4: {situation.choice_4}</h3>

            <button onClick={handleChoice}>Submit Test</button>
        </div>
    )
}

export default Situation;