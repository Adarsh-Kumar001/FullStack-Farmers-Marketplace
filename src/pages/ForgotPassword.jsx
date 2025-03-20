import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/img/MainLogo.png'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { app } from '../FirebaseConnect'

const ForgotPassword = () => {

    const db = getAuth(app)

    const [email, setEmail] = useState("");

    const sendPassResetMail=()=>{
        sendPasswordResetEmail(db,email).then(data=>{
            alert("Please check your email!")
        }).catch(error=>{
            alert(error.code)
        })
    }


    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-10 w-auto" src={Logo} alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                        Remember password?
                        <Link to='/login'
                            className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">

                            &nbsp;Login to your existing account
                        </Link>
                    </p>
                </div>


                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form>
                            <div>
                                <label className="block text-sm font-medium leading-5  text-gray-700">Email</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={e => setEmail(e.target.value)} placeholder="enter your email" type="text" required="" value={email} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button onClick={sendPassResetMail} type='submit' className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Send
                        </button>
                    </span>
                </div>
                    </div>


                </div>
        
    
            </div>
        </>
    )
}

export default ForgotPassword