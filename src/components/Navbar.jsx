import React from 'react'
import { Link } from "react-router";
import profilePic from '../assets/img/pfp.jpg'

import Logo from '../assets/img/MainLogo.png'

const Navbar = ({ user }) => {
  if (user == null) {
    return (
      <div className=' w-[full] bg-green-500 shadow-[0_20px_50px_rgba(34,_197,_94,_0.7)] border-black border-b-2 flex justify-between'>
        <Link to="/">
          <img className='w-[4rem] p-2' src={Logo} alt="logo" />
        </Link>

        <div className='my-auto flex gap-3 text-base font-semibold text-white'>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        <div className='my-auto pr-5'>
          <Link to="/login">
            <button className="w-[6rem] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Log in
            </button>
          </Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='w-[100%] bg-green-500 shadow-[0_20px_50px_rgba(34,_197,_94,_0.7)] border-black border-b-2 flex justify-between'>
        <Link className='hover:rotate-6 transition-all duration-300' to="/">
          <img className='w-[4rem] p-2' src={Logo} alt="logo" />
        </Link>

        <div className='my-auto flex gap-3 text-base font-semibold text-white'>
          <Link className='hover:text-gray-200 transition-all duration-200' to="/contact">Contact</Link>
          <Link className='hover:text-gray-200 transition-all duration-200' to="/about">About</Link>
        </div>

        <div className='my-auto pr-5 flex gap-3'>

          <Link to="/profile">

            <div className='group'>
              <img className=' w-10 rounded-full border border-black' src={profilePic} alt="profile picture" />
              <div className='group-hover:opacity-100 opacity-0 pointer-events-none absolute right-48 top-5 text-[13px] bg-gray-500 h-[25px] flex items-center w-[90px] justify-center text-white rounded-full transition duration-300'>
                View Profile
              </div>
            </div>

          </Link>
          <Link>
            <button className=" flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Sell Product
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar