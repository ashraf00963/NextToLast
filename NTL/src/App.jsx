import { Navbar, Login } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import './App.css';




function App() {
  return (
    <Router>
        <Navbar />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
    </Router>
  );
}

export default App;
