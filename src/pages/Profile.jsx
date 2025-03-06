import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import { Link } from 'react-router-dom';

import { app } from '../FirebaseConnect'
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);
const db = getFirestore(app);

const handleSignout = async () => {
    try {
        await auth.signOut();
        if(confirm("Are You Sure? You Will Be Signed Out!")){
        window.location.href = "/login";
        console.log("user signed out")
        }
    } catch (err) {
        console.log(err.message);
    }
}

const signInButton = () => {
  window.location.href="/login"
}

const Profile = () => {
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


    if (userDetails) {
        return (
            <div className='w-full h-[80vh] mt-10 flex justify-center content-center'>
                <div className='w-[60rem] bg-green-500 text-white text-lg p-5'>
                    <h1>Name: {userDetails.name}</h1>
                    <h1>Email: {userDetails.email}</h1>

                    <button onClick={handleSignout} className=" flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Sign out
                    </button>

                    <div className='flex justify-between'>
                    <h2 className='text-white text-2xl mt-3'>My Listings</h2>

                    <Link to="/add-listing" className="w-[8rem] flex justify-center content-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Add Listing
                    </Link>
                    </div>
                    <div>

                    </div>

                </div>
            </div>
        )
    }
    else {
        return (
            <div>    
            <div className='w-full h-[80vh] flex justify-center content-center'>
                <h1 className='w-[40rem] h-[20rem] bg-green-500 flex flex-col justify-center content-center m-auto'>
                    <p className='m-auto text-xl font-semibold'>Please Login To See Your Profile</p>
                    <button onClick={signInButton} className=" flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Log In
                </button>
                </h1>
                
            </div>
            </div>
        
        )
    }
}

export default Profile

