import { useState, useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import ColorFill from './components/colorfill/ColorFill';
import Navbar from './components/navbar/Navbar';
import Slider from './components/slider/Slider';
import ToDo from './components/todo/ToDo';
import Home from './components/home/home';

function App() {
  const images = [

  ]
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/colorfill' element={<ColorFill/>}/>
        <Route path='/todo' element={<ToDo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
