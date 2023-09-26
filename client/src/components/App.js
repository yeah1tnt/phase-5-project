import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';


import Home from './Home';

function App() {
    return (
        <Router>
        <div className="App">
            <nav>
                <Link to="/">Home</Link>
            
            </nav>

            <Routes>
            <Route exact path="/" element={<Home />} />
            </Routes>

        </div>
        </Router>
    )
  
}

export default App;
