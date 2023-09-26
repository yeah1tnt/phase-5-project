import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';


import Home from './Home';
import SignUp from './SignUp';

function App() {
    const [user, setUser] = useState(null);


    return (
        <Router>
        <div className='App'>
            <nav>
                <Link to='/'><button>Home</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
            </nav>

            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/signup' element={<SignUp />} />
            </Routes>

        </div>
        </Router>
    )
  
}

export default App;
