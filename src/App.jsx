
import { Routes, Route } from "react-router-dom";
import React,{ useEffect, useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Notfound from "./pages/Notfound";

import {app} from './FirebaseConnect'
const auth = getAuth(app);

function App() {

  const [user, setUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if(user){
      //user logged in
      setUser(user);
    }
    else{
      //user not logged in
      setUser(null);
    }
  })
}, [])


  return (
    <>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={< Home user={user}/>} />
        <Route path="/about" element={< About/>} />
        <Route path="/contact" element={< Contact/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/*" element={<Notfound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
