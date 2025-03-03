import React from 'react'
import Logo from '../assets/img/MainLogo.png'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center content-center w- pt-5 bg-gray-300 pb-5'>
      <div className='flex gap-2 m-auto'>
        <img className=' w-10 rounded-full m-auto' src={Logo} alt="logo" />
        <h1 className='m-auto'>FarmConnect</h1>
      </div>
      <p className='m-auto w-[50%] text-center text-sm'>FarmConnect - Empowering farmers to buy, sell, and exchange products seamlessly. Connect, trade, and grow with a community-driven marketplace built for sustainable agriculture.</p>
      <div className='m-auto text-gray-700 mt-6 flex gap-2 font-bold'>
        <Link to="/about">
          About
        </Link>
        <Link to="/blog">
          Blog
        </Link>
        <Link to="/contact">
          Contact
        </Link>
        <Link to="/profile">
          Profile
        </Link>
      </div>
    </div>
  )
}

export default Footer