
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
import AddListing from "./pages/AddListing";
import Marketplace from "./pages/Marketplace";
import ItemDetails from "./pages/ItemDetails";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Notfound from "./pages/Notfound";

import {app} from './FirebaseConnect'
import WeatherPredictor from "./pages/WeatherPredictor";
import ShelfLife from "./pages/ShelfLife";
import ForgotPassword from "./pages/ForgotPassword";

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
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/add-listing" element={<AddListing user={user}/>} />
        <Route path="/marketplace" element={<Marketplace user={user}/>} />
        <Route path="/product/:id" element={<ItemDetails/>} />
        <Route path="/search" element={<Search user={user}/>} />
        <Route path="/chat/:emailid" element={<Chat user={user}/>} />
        <Route path="/weather" element={<WeatherPredictor/>} />
        <Route path="/shelflife" element={<ShelfLife/>} />
        <Route path="/forgotpass" element={<ForgotPassword/>} />
        <Route path="/*" element={<Notfound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
