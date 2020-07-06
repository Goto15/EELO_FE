import React from 'react';
import InfoBlock from './Components/infoBlock';
import PlayerStats from './Components/playerStats';
import Footer from './Components/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './Components/adminPage';

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <InfoBlock />
        <PlayerStats/>
        <div style={{content: '', clear: 'both'}}></div>
        <Footer/>
      </Route>
      
      <Route path='/admin'>
        <AdminPage/>
      </Route>
    </Router>
  )
}

export default App;
