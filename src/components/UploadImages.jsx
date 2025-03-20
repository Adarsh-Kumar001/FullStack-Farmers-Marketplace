import React, { useState, useEffect } from 'react'

import { ToastContainer, toast } from "react-toastify";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { db } from '../../config/index.js'
import { supabase } from '../SupabaseConnect';
import { ItemImages } from '../../config/schema.js';

const UploadImages = ({ triggerUploadImages, setLoader }) => {

    useEffect(() => {
        if (triggerUploadImages) {
            UploadImages();
        }
    }, [triggerUploadImages])


    const [selectedimagesList, setselectedimagesList] = useState([])

    const [previewImageUrl, setpreviewImageUrl] = useState(null)

    const FileSelect = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            // const fileUrl = URL.createObjectURL(file);
            setselectedimagesList((prev) => [...prev, file])
        }
    }

    const RemoveImage = (image, index) => {
        const newImagesList = selectedimagesList.filter((item) => item != image);
        setselectedimagesList(newImagesList);
    }

    async function UploadImages() {

        selectedimagesList.forEach(async(file) => {

            setLoader(true);

            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = supabase.storage.from('Images').upload(filePath, file)
            if (error) {
                console.log(error)
            } else {
                const { data: url } = supabase.storage.from('Images').getPublicUrl(filePath);
                console.log(url.publicUrl)
                await db.insert(ItemImages).values({
                    imageUrl: url.publicUrl,
                    ItemListingId: triggerUploadImages,
                })
                toast.success("Image Saved!", { position: "top-center" });
            }
            setLoader(false);
        })
    }

    return (
        <div className='w-full items-center'>

            <form className='w-[100%] flex flex-col mx-auto  rounded border-2 border-gray-700 p-4 mt-10'>
                <h2 className='font-bold text-2xl mb-2'>Upload Images</h2>
                <div className='flex justify-between w-[100%] gap-5'>
                    <div className='w-[100%] ml-5'>
                        <label htmlFor='upload-image'>
                            <div className='bg-green-500 hover:cursor-pointer hover:shadow-md shadow-black hover:bg-opacity-45 transition duration-150 font-bold text-2xl border-black border-2 rounded-md w-[20rem] h-[10rem] bg-opacity-30 flex flex-col gap-0'>
                                <div className='m-auto justify-center flex flex-col content-center'>
                                    <p className='m-auto'>+</p>
                                    <p className='m-auto text-sm font-extralight'>click to upload image</p>
                                </div>
                            </div>
                        </label>
                        <input onChange={(e) => FileSelect(e)} type='file' multiple={true} id='upload-image' className='opacity-0' />
                    </div>
                    <div className='previewImage w-[100%] mx-auto'>
                        <img className='h-[10rem] w-[20rem] m-auto text-red-700 flex justify-center place-items-center' src={previewImageUrl} alt='PREVIEW IMAGE' />
                    </div>
                </div>
                <div className='m-auto pl-5 pr-5 flex'>
                    {selectedimagesList.map((image, index) => (
                        <div key={index}>
                            <IoIosCloseCircleOutline onClick={() => RemoveImage(image, index)} className='absolute rounded-full bg-white text-black font-extrabold m-2 text-xl hover:bg-red-500' />
                            <img onMouseEnter={() => setpreviewImageUrl(URL.createObjectURL(image))} onMouseLeave={() => setpreviewImageUrl(null)} className='w-[400px] h-[150px] object-cover' src={URL.createObjectURL(image)} />
                        </div>
                    ))}
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default UploadImages