import { Navbar, Login, Register } from './components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './Home';
import './App.css';
import { useState } from 'react';
import Basket from './components/basket';
import Account from './components/Login/account';
import Watches from './components/watches';


function App() {
  const [watchId, setWatchId] = useState(null);

  return (
    <AuthProvider>
      <Router>
          <Navbar />
            <Routes>
              <Route exact path='/' element={<HomePage setWatchId={setWatchId} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/account' element={<Account />} />
              <Route path='/basket' element={<Basket />} />
              <Route path='/watch' element={<Watches watchId={watchId} />} />
            </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
