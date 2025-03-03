
import {delay, motion} from 'framer-motion';

import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import { app } from '../FirebaseConnect';
import { getAuth } from 'firebase/auth';

import BuySellSvg from '../assets/svg/store.svg';
import ExchangeSvg from '../assets/svg/loop.svg';
import ChatSvg from '../assets/svg/chat.svg';
import WeatherSvg from '../assets/svg/cloud.svg';

import TractorImg from '../assets/img/tractor.png'

const auth = getAuth(app);
const db = getFirestore(app);

const textVariants = {
  initial:{
    x:-500,
    opacity:0,
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      duration:1,
      staggerChildern:0.1,
    },
  },
};

const slidingTextVariants = {
  initial:{
    x:0,
  },
  animate:{
    x:"-290%",
    transition:{
      repeat: Infinity,
      repeatType: "mirror",
      duration:20,
    },
  },
};


const Home = ({ user }) => {

  const [userDetails, setUserdetails] = useState(null);

  const getUserDataFromFirebaseDB = async () => {
    auth.onAuthStateChanged(async (theUser) => {
      //get user from firebase db
      const docReference = doc(db, "Users", theUser.uid);
      const docSnap = await getDoc(docReference);
      if (docSnap.exists()) {
        setUserdetails(docSnap.data());
        console.log("User:", docSnap.data());
      } else {
        console.log("User not logged in")
      }
    });
  }
  useEffect(() => {
    getUserDataFromFirebaseDB();
  }, [])


  if (userDetails && user) {
    return (
      <>
        <div className='w-[100%] flex flex-col h-[91vh] overflow-hidden'>

          <div className='relative w-[80%]'>
            <motion.div className='w-[80%] absolute text-[15rem] top-[21rem] -z-10 text-green-500 opacity-20 whitespace-nowrap' variants={slidingTextVariants} initial="initial" animate="animate">BUY SELL EXCHANGE AND MUCH MORE</motion.div>
          </div>

          <div className='flex'>
          <div className='w-[40%] pl-10 pt-[15rem] relative left-14 bottom-28'>
            <motion.h1 className='text-6xl flex gap-2 mb-1'  variants={textVariants} initial="initial" animate="animate">Welcome </motion.h1><motion.h2 className='text-6xl text-green-600'  variants={textVariants} initial="initial" animate="animate">{userDetails.name}</motion.h2>
            <motion.p className='text-xl mb-5'  variants={textVariants} initial="initial" animate="animate">To FarmConnect, where you can buy, sell, exchange farm products, connect with farmers, stay updated with real-time weather insights and much more — all in one place !</motion.p>
            <motion.div className='flex gap-3'  variants={textVariants} initial="initial" animate="animate">
              <Link to="/">
                <button className=" flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Get Started
                </button>
              </Link>
              <Link to="/about">
                <button className=" flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Learn More
                </button>
              </Link>

            </motion.div>
          </div>

          <div className='w-[60vw}'>
            <img className='w-[45rem] relative left-14' src={TractorImg} />
          </div>
          </div>

        </div>

        <div className='w-[100%] bg-green-500'>
          
           <h1 className='text-white text-4xl flex justify-center pt-7 pb-7'>What We Offer</h1>

           <div className='flex gap-5 w-full justify-center'>
            <div className='flex flex-col w-[18rem] justify-center content-center bg-white p-2 mb-10 m-5'>
              <img className='w-24 m-auto' src={BuySellSvg}/>
              <h2 className='m-auto'> Buy & Sell with Ease</h2>
              <p className='m-auto text-justify'>Discover a seamless marketplace to buy and sell farm products and equipment directly with fellow farmers—no middlemen, just fair deals.</p>
            </div>

            <div className='flex flex-col w-[18rem] justify-center content-center bg-white p-2 mb-10 m-5'>
              <img className='w-24 m-auto' src={ExchangeSvg}/>
              <h2 className='m-auto'> Exchange Products Hassle-Free</h2>
              <p className='m-auto text-justify'>Have extra tools or surplus harvest? Use our unique exchange feature to swap goods with other farmers and maximize resources.</p>
            </div>

            <div className='flex flex-col w-[18rem] justify-center content-center bg-white p-2 mb-10 m-5'>
              <img className='w-24 m-auto' src={ChatSvg}/>
              <h2 className='m-auto'> Chat with Farmers</h2>
              <p className='m-auto text-justify'>Connect, collaborate, and learn from other farmers through our built-in chat system. Share experiences, discuss best practices, and build a supportive farming community.</p>
            </div>

            <div className='flex flex-col w-[18rem] justify-center content-center bg-white p-2 mb-10 m-5'>
              <img className='w-24 m-auto' src={WeatherSvg}/>
              <h2 className='m-auto'> Weather Updates</h2>
              <p className='m-auto text-justify'>Stay ahead of the weather with live forecasts and alerts, helping you plan your farming activities more effectively.</p>
            </div>
           </div>
 

        </div>

      </>
    )
  }

}


export default Home