import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { auth } from '../Firebase/firebase';



const ResetPassword = ({ setIsReset, setIsLogin}) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent ! Check your inbox.");
        }
        catch (error) {
            setMessage("Error: " + error.message);
        }
    }


    return (
        <section className='h-[100vh] flex flex-col justify-center items-center background-image'>
            <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col  items-center'>
                <div className='mt-3 p-4'>

                    <h1 className='text-center text-[28px] font-bold mb-5'>Forgot password ? </h1>
                    <p className='text-center text-sm text-gray-400 mb-3'>Provide the email address associated with your account to recover your password.</p>

                </div>
                <div className="w-full">
                    <input type='email' name='email' className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className='w-full'>
                    <button className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center ' onClick={handleResetPassword}>
                        Send Reset Email
                    </button>
                </div>

                {message && <p className='text-center text-md mt-4'>{message}</p>}


                <div className='flex justify-between gap-10 mt-4'>

                    <div className='mt-5 text-center text-gray-400 text-sm'>
                        <button onClick={() => setIsReset(false)}>Login</button>
                    </div>
                    <div className='mt-5 text-center text-gray-400 text-sm'>
                        <button onClick={() =>{ setIsLogin(false);
                            setIsReset(false);
                        }}>Register</button>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ResetPassword;
