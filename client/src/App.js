// import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';


function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
