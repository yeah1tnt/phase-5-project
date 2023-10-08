import React, { useState, useEffect } from "react";
import Game from "./Game";

function Situation({user_id, dungeon_id}){
    const [situation, setSituation] = useState('');
    const [choice, setChoice] = useState({1:'', 2:'', 3:'', 4:'', })
    const [dungeon, setDungeon] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(dungeon_id){
            fetch(`/dungeonrandomizer/${dungeon_id}`)
            .then((r) => r.json())
            .then((r) => {
                setDungeon(r)
            })
            .catch((error) => {
                setMessage(error.message)
            })
        }
    })

    return (
        <div>
            
        </div>
    )
}