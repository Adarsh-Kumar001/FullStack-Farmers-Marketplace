import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { db } from '../../config'
import { eq } from 'drizzle-orm'

import { ItemListing, ItemImages } from '../../config/schema'

import { Carousel } from "@material-tailwind/react";


const ItemDetails = () => {

    const { id } = useParams();

    const [userListingList, setuserListingList] = useState([])

    const [ItemImagesList, setItemImagesList] = useState([])

    const getListing = async () => {

        const result = await db.select().from(ItemListing)
            .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.ItemListingId))
            .where(eq(ItemListing.id, id))


        // Group listings by id so that unique itmImages.itemListingId matches itemListing.id
        const listingsMap = new Map();

        result.forEach(({ itemListing, itemImages }) => {
            if (!listingsMap.has(itemListing.id)) {
                listingsMap.set(itemListing.id, {
                    ...itemListing,
                    images: itemImages ? [itemImages.imageUrl] : [],
                });
            } else if (itemImages) {
                listingsMap.get(itemListing.id).images.push(itemImages.imageUrl);
            }
        });

        const listings = Array.from(listingsMap.values());

        setuserListingList(listings[0]);

        setItemImagesList(listings[0].images)

        console.log(userListingList)

    }

    useEffect(() => {

        getListing();

    }, [id])



    return (
        <div className='w-full'>

            <h1 className='font-bold text-3xl ml-[8rem] mt-5'>Product Details</h1>

            <div className='flex'>
                <Carousel className="ml-[8rem] w-[50vw] h-[60vh] bg-black mt-3">

                    {ItemImagesList.map((image, index) => (
                        <img key={index} src={image} className="h-[100%] object-cover mx-auto" />
                    ))}

                </Carousel>
                <div className='pt-5 mt-3 w-[30rem] bg-gray-100'>
                    <h2 className='pl-[3rem] text-2xl border-b-2 border-black pb-3'>{userListingList.productName}</h2>
                    <div className='flex justify-between'>
                    <h2 className='pl-[3rem] text-3xl pb-3 pt-3'>&#8377;{userListingList.sellingPrice}</h2>
                    <button className="w-[8rem] h-[2.5rem] mt-3 mr-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Make an offer
                    </button>
                    </div>
                    <div className='flex gap-3 justify-center mt-2 mb-3'>
                        <div className='bg-yellow-500 rounded-full w-[40%] h-7 flex justify-center content-center place-content-center'>
                            {userListingList.category}
                        </div>
                        <div className='bg-red-500 rounded-full w-[40%] flex justify-center content-center place-content-center'>
                            {userListingList.condition}
                        </div>
                    </div>
                    <p className='pl-[3rem] text-base pb-3 pt-3 pr-3'>{userListingList.description}</p>

                    <div className='absolute flex justify-between w-[30rem] bottom-40 pl-[3rem] text-sm border-t-2 border-black pb-3'>
                    <div className='pt-3'>
                    <h5>Seller: {userListingList.postedBy}</h5>
                    <h5>Created On: {userListingList.postedDate}</h5>
                    </div>
                    <Link to={`/chat/${userListingList.postedBy}`}>
                    <button className="w-[10rem] h-[2.5rem] mt-3 mr-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Chat with seller
                    </button>
                    </Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ItemDetails