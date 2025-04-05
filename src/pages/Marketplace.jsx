import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { db } from '../../config'
import { eq, notLike } from 'drizzle-orm'

import { ItemListing } from '../../config/schema'
import { ItemImages } from '../../config/schema'



const Marketplace = ({ user }) => {

    const [marketplaceItems, setmarketplaceItems] = useState([])


    const getListings = async () => {
        const result = await db.select().from(ItemListing)
            .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.ItemListingId))
            .where(notLike(ItemListing.postedBy, user.email))

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

        setmarketplaceItems(listings);

        console.log(listings);

    };

    useEffect(() => {
        getListings();
    }, [user])

    if(user){
    return (
        <div className='w-full flex flex-col'>

           <Link to="/search">
            <form class="w-[40rem] mx-auto mt-8 mb-3">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for products..." />
                    
                 </div>
            </form>
            </Link>

            <div className='w-full flex flex-wrap p-5 text-white font-semibold capitalize gap-5'>
                {marketplaceItems && marketplaceItems.map((item, index) => (
                    <Link to={`/product/${item.id}`}>
                        <div className='w-[20rem] border-gray-600 border-2 bg-blue-500 text-sm rounded-lg hover:scale-[1.02] transition-all duration-200' key={index}>
                            <img className='pb-2 object-cover rounded-t-lg rounded-r-lg w-[20rem] h-[15rem]' src={item.images[0]} />
                            <h3 className='pl-2 mx-3 border-b border-slate-200'>{item.productName}</h3>
                            <p className='pl-5 pt-2'>&#8377;{item.sellingPrice}</p>
                            <div className='flex gap-3 justify-center mt-2 mb-3'>
                                <div className='bg-yellow-500 rounded-full w-[40%] h-7 flex justify-center content-center place-content-center'>
                                    {item.category}
                                </div>
                                <div className='bg-red-500 rounded-full w-[40%] flex justify-center content-center place-content-center'>
                                    {item.condition}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
else{
    return(
    <div className='flex flex-col w-full h-full bg-gray-100 pt-[15rem]'>
        <h1 className='m-auto text-3xl'>Kindly Login to access the marketplace</h1>
        <Link to='/login' className='m-auto pb-[11rem]'>
        <p className='text-red-700 hover:text-blue-600 m-auto'>Click here to go to login page...</p>
        </Link>
    </div>
    )
}
}
export default Marketplace