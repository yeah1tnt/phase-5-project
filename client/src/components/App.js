import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';


import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Character from './Character';
import CharacterList from './CharacterList';
import Game from './Game';
function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/check_session').then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    if (user.id) {
                        setUser(user);
                      }
                })
            }
    })},[]);

    return (
        <Router>
        <div className='App'>
            
            <Link to='/'><button>Home</button></Link>
            {user ? <Link to='/character'><button>Create Your Character</button></Link> : <Link to='/signup'><button>Signup</button></Link>}            
            {user ? <Link to='/characterList'><button>Character List</button></Link > : null}
            
            <Routes>
                <Route exact path='/' element={<Home user={user} setUser={setUser}/>} />
                <Route exact path='/signup' element={<SignUp setUser={setUser}/>} />
                <Route exact path='/login' element={<Login setUser={setUser}/>} />
                <Route exact path='/character' element={<Character user={user} setUser={setUser}/>} />
                <Route exact path='/characterList' element={<CharacterList user={user} setUser={setUser}/>} />
                <Route exact path="/game/:id" element={<Game user={user}/>} />
            </Routes>

        </div>
        </Router>
    )
  
}

export default App;
