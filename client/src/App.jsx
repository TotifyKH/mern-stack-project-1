import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components and Routers
import Header from './components/Header';
//import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

import FlappyBird from './games/flappyBird/FlappyBird';


//functions


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        <Route path='/games/flappyBird' element={<FlappyBird/>}/>
        
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
