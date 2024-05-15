import { Navbar, Login, Register } from './components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './Home';
import './App.css';
import { useState } from 'react';
import Basket from './components/basket';
import Account from './components/Login/account';


function App() {
  return (
    <AuthProvider>
      <Router>
          <Navbar />
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/account' element={<Account />} />
              <Route path='/basket' element={<Basket />} />
            </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
