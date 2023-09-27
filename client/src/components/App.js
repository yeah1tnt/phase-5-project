import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';


import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';


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
            <nav>
                <Link to='/'><button>Home</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
            </nav>
            <Routes>
                <Route exact path='/' element={<Home user={user} setUser={setUser}/>} />
                <Route exact path='/signup' element={<SignUp setUser={setUser}/>} />
                <Route exact path='/login' element={<Login setUser={setUser}/>} />
            </Routes>

        </div>
        </Router>
    )
  
}

export default App;
