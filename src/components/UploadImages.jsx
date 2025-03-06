import React from 'react'

const UploadImages = () => {
    return (
        <div className='w-full items-center'>

            <form className='w-[100%] flex flex-col mx-auto  rounded border-2 border-gray-700 p-4 mt-10'>
                <h2 className='font-bold text-2xl mb-2'>Upload Images</h2>
                <div className='flex justify-between w-[100%]'>
                    <div>
                        <label htmlFor='upload-image'>
                          <div className='bg-green-500 hover:cursor-pointer hover:shadow-md shadow-black hover:bg-opacity-45 transition duration-150 font-bold text-2xl border-black border-2 rounded-md h-[10rem] bg-opacity-30 flex justify-center content-center'>
                            <p className='m-auto'>+</p>
                          </div>
                        </label>
                        <input type='file' multiple={true} id='upload-image' className='opacity-0'/>
                   </div>
                </div>
            </form>
        </div>
    )
}

export default UploadImages