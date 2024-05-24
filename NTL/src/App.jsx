import { Navbar, Login, Register, Basket, Account, Watches, ScrollToTop, Delivery, Payment, Confirmation, ComingSoon, Admin } from './components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import { BasketProvider } from './components/BasketContext';
import HomePage from './Home';
import './App.css';


function App() {
  const [watchId, setWatchId] = useState(null);

  return (
    <AuthProvider>
      <BasketProvider>
        <Router>
          <ScrollToTop />
            <Navbar />
              <Routes>
                <Route exact path='/' element={<HomePage setWatchId={setWatchId} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/account' element={<Account />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/watch' element={<Watches watchId={watchId} />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/confirmation' element={<Confirmation />} />
                <Route path='/coming-soon' element={<ComingSoon />} />
                <Route path='/admin' element={<Admin />} />
              </Routes>
        </Router>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
