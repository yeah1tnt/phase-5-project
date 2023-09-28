import React, { useState } from "react";


function Character({user, setUser}){
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [str, setStr] = useState('');
    const [agi, setAgi] = useState('');
    const [vit, setVit] = useState('');
    const [int, setInt] = useState('');
    const [dex, setDex] = useState('');

    function handleSubmit(e){
        return
    }
    return(
        <div>
            <h1>Character</h1>
        </div>
    )
}