import React, { useState, useEffect } from "react";


function Situation({dungeon_id, isSituation}){
    const [situation, setSituation] = useState('');
    const [allSituation, setAllSituation] = useState([]);
    const [choice, setChoice] = useState(1);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(dungeon_id){
            fetch(`/situation/${dungeon_id}`)
            .then((r) => r.json())
            .then((r) => {
                const randomIndex = r[Math.floor(Math.random() * r.length)];
                setSituation(randomIndex)
            })
            .catch((error) => {
                setMessage(error.message)
            })
        }
        fetch('/situation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((r) => r.json())
        .then((r) => {
            setAllSituation(r)
            console.log(r)
        })
    }, [dungeon_id]);

    const handleChoice = (e) => {
        e.preventDefault();
        situation_1()
        situation_2()
        situation_3()
        situation_4()
        situation_5()
        situation_6()
        isSituation = false;
        setIsButtonClicked(true);
    }

    

    const situation_1 = () => {
        if(situation.id === 1){
            if(choice === '1'){
                return (<h3>You attacked the dragon, it showed little resistance and you were able to kill it (str + 2)</h3>)
            }else if(choice === '2'){
                return(<h3>You put a potion of healing onto the dragon's wound. It woke up slowly and gave you its treasure and new ability (gold + 100 and special skill)</h3>)
            }else if(choice === '3'){
                return(<h3>You sneak around the dragon and found the treasure it is guarding (gold + 500 and new equipment)</h3>)
            }else{
                return(<h3>You watch the dragon and admire its beauty, and walk away empty handed</h3>)
            }
        } 
    }

    const situation_2 = () => {
        if(situation.id === 2){
            if(choice === '1'){
                return (<h3>You found a bard, she stopped as she saw you. After a short conversation, she decided to join you (all stats +1)</h3>)
            }else if(choice === '2'){
                return(<h3>You walk away, empty handed, the inn vanished when you turned back</h3>)
            }else if(choice === '3'){
                return(<h3>Test23</h3>)
            }else{
                return(<h3>Test24</h3>)
            }
        }
    }

    const situation_3 = () => {
        if(situation.id === 3){
            if(choice === '1'){
                const random = Math.floor(Math.random() * 100) + 1;
                if(random > 50){
                    return (<h3>The light was getting too blinding for you to see, you turned back with damaged vision (agi - 1)</h3>)
                }else{
                    return (<h3>You continue walking toward the light, closing your eyes. When you opened them you saw an sentient artifact that give you wisdom from the past (int + 2)</h3>)
                }
                
            }else if(choice === '2'){
                return(<h3>Test32</h3>)
            }else if(choice === '3'){
                return(<h3>Test33</h3>)
            }else{
                return(<h3>Test34</h3>)
            }
        }
    }

    const situation_4 = () => {
        if(situation.id === 4){
            if(choice === '1'){
                return (<h3>Look like you interrupted their summoning ritual, they attacked you</h3>)
            }else if(choice === '2'){
                return(<h3>Your sneak attack took them by surprised, they ran away to get reinforcement (dex + 1)</h3>)
            }else if(choice === '3'){
                return(<h3>You sneak around and stole their scripture right under their nose (int + 2)</h3>)
            }else{
                return(<h3>Test44</h3>)
            }
        }
    }

    const situation_5 = () => {
        if(situation.id === 5){
            if(choice === '1'){
                return (<h3>The chest was empty, but you found something behind it. A set of translucent magical gloves (vit + 3)</h3>)
            }else if(choice === '2'){
                return(<h3>You swing your weapon at the chest, made a dent on it. It was a good excercise (str + 2)</h3>)
            }else if(choice === '3'){
                return(<h3>Suspicious of the chest, you simply walk away</h3>)
            }else{
                return(<h3>Test54</h3>)
            }
        }
    }

    const situation_6 = () => {
        if(situation.id === '6'){
            if(choice === '1'){
                console.log('Test61')
                return (<h3>You heard some rustling inside the house, the door slowly opened and you saw an old man, he invited you to eat with him. (vit + 3)</h3>)
            }else if(choice === '2'){
                console.log('Test62')
                return(<h3>You slowly pushes the door open and sneak inside, you took all of the resident's valuable (dex + 1 and gold + 25)</h3>)
            }else if(choice === '3'){
                console.log('Test63')
                return(<h3>The door flew open, but there is nothing inside. Look like it was enchanted with a magic spell to protect its inhabitant, you walk away empty handed</h3>)
            }else{
                console.log('Test64')
                return(<h3>Not really sure why you did this, but the people inside probably was very confused</h3>)
            }
        }
    }

    

    return (
        <div>
            <h1>Random situation</h1>
            <h2>{situation.situation}</h2>
            {/* <select id='choice' onChange={(e) => setChoice(e.target.value)}>
                <option value = '1'>1: {situation.choice_1}</option>
                {situation.choice_2 !== '' ? <option value = '2'>2: {situation.choice_2}</option> : null}
                {situation.choice_3 !== '' ? <option value = '3'>3: {situation.choice_3}</option> : null}
                {situation.choice_4 !== '' ? <option value = '4'>4: {situation.choice_4}</option> : null}
            </select> */}
            <div>
                <label>
                    <input
                        type="radio"
                        name="choice"
                        value="1"
                        checked={choice === '1'}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                    1: {situation.choice_1}
                </label>
                {situation.choice_2 !== '' ? (<label>
                    <input
                        type="radio"
                        name="choice"
                        value="2"
                        checked={choice === '2'}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                    2: {situation.choice_2}
                </label>): null}
                {situation.choice_3 !== '' ? (<label>
                    <input
                        type="radio"
                        name="choice"
                        value="3"
                        checked={choice === '3'}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                    3: {situation.choice_3}
                </label>): null}
                {situation.choice_4 !== '' ? (<label>
                    <input
                        type="radio"
                        name="choice"
                        value="4"
                        checked={choice === '4'}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                    4: {situation.choice_4}
                </label>): null}

            </div>
            
            <button onClick={handleChoice} disabled={isButtonClicked}>Choose</button>
            {isButtonClicked ? (
                <>
                    {situation_1()}
                    {situation_2()}
                    {situation_3()}
                    {situation_4()}
                    {situation_5()}
                    {situation_6()}
                </>
                ) : null}
        </div>
    )
}

export default Situation;