import React, { useState } from 'react'

import { db } from '../../config/index.js'
import { ItemListing } from '../../config/schema.js'
import UploadImages from '../components/UploadImages.jsx'


function AddListing({ user }) {

  const [formData, setformData] = useState([])

  const handleInput = (name, value) => {
    setformData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    console.log(formData)
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!formData.productName || !formData.sellingPrice || !formData.description) {
      alert("Please fill in all required fields.")
    }
    else if (formData.productName && formData.sellingPrice) {
      try{
      const result = await db.insert(ItemListing).values(formData)
      if (result) {
        console.log("data saved")
      }
    }catch(e){
      console.log("errror is",e)
    }
    }


  }

  if (user) {
    return (
      <div className='w-full items-center'>

        <form className='w-[50%] flex flex-col mx-auto  rounded border-2 border-gray-700 p-4 mt-10'>
          <h2 className='font-bold text-2xl mb-2'>Product Details</h2>
          <div className='flex justify-between w-[100%]'>
            <div className='flex flex-col mb-2'>
              <p className='font-semibold'>Product Name</p>
              <input name='productName' onChange={(e) => handleInput(e.target.name, e.target.value)} className='w-[20rem] p-2 border-2 border-black' type="text" required />
            </div>
            <div className='flex flex-col mb-2'>
              <p className='font-semibold'>Selling Price</p>
              <input name='sellingPrice' onChange={(e) => handleInput(e.target.name, e.target.value)} className='w-[20rem] p-2 border-2 border-black' type="number" required />
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <p className='font-semibold'>Product Description</p>
            <textarea name='description' onChange={(e) => handleInput(e.target.name, e.target.value)} className='resize-none p-2 border-2 border-black rows="4" cols="50"' type="text"></textarea>
          </div>


          <div className='flex justify-between w-[100%]'>
            <div className='flex flex-col mb-2'>
              <label htmlFor="category" className='font-semibold'>Category:</label>
              <select onChange={(e) => handleInput(e.target.name, e.target.value)} id="category" name="category" className='w-[20rem] p-2 border-2 border-black'>
                <option value="tools">Tools</option>
                <option value="crop">Crop</option>
                <option value="machinery">Machinery</option>
                <option value="Services">Services</option>
                <option value="Services">Others</option>
              </select>
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="condition" className='font-semibold'>Condition:</label>
              <select onChange={(e) => handleInput(e.target.name, e.target.value)} id="condition" name="condition" className='w-[20rem] p-2 border-2 border-black'>
                <option value="new">New</option>
                <option value="slightly used">Slightly used</option>
                <option value="used">used</option>
              </select>
            </div>
          </div>

          
        <UploadImages/>
        
          <button type='submit' onClick={(e) => submitForm(e)} className="w-[8rem] flex justify-center mx-auto mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            Submit
          </button>
        </form>


      </div>
    )
  }
  else {
    alert("Please Login to submit listing")
  }
}

export default AddListing