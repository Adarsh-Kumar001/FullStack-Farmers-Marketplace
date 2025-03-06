import React from 'react'

const UploadImages = () => {
    return (
        <div className='w-full items-center'>

            <form className='w-[50%] flex flex-col mx-auto  rounded border-2 border-gray-700 p-4 mt-10'>
                <h2 className='font-bold text-2xl mb-2'>Upload Images</h2>
                <div className='flex justify-between w-[100%]'>
                    <div className='flex flex-col mb-2'>
                        <p className='font-semibold'>Product Name</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UploadImages