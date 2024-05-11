import { Navbar, Login, Register } from './components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import './App.css';
import { useState } from 'react';
import Basket from './components/basket';


function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/login' element={<Login onLogin={() => setLoggedIn(true)} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/basket' element={<Basket />} />
          </Routes>
    </Router>
  );
}

export default App;
