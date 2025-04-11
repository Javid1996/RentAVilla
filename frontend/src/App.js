import React from 'react';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn.js';
// import Header from './components/Header';
import { Routes,Route, Link } from "react-router-dom"
import CardDetails from './components/CardDetails';
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
     <ToastContainer />
      
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route  path="/:event_id" element={<CardDetails/>}/>
      
    </Routes>
    </div>
  );
}

export default App;
