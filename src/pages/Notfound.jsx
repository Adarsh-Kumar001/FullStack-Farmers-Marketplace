import React from 'react'
import { Link } from 'react-router-dom'

import ErrorPng from '../assets/img/404.png'

const Notfound = () => {
  return (
    <div className='flex flex-col w-full mt-20 mb-20 gap-3'>
      <img className='w-[10rem] m-auto' src={ErrorPng} />
      <h2 className='m-auto'>ERROR 404 : PAGE NOT FOUND</h2>
      <p className='m-auto mb-2'>Oops! It looks like the page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="m-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          Return To Home
        </button>
      </Link>
    </div>
  )
}

export default Notfound