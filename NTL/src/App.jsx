import { Navbar, Login, Register } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import './App.css';
import { useState } from 'react';


function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/login' element={<Login onLogin={() => setLoggedIn(true)} />} />
            <Route path='/register' element={<Register />} />
          </Routes>
    </Router>
  );
}

export default App;
