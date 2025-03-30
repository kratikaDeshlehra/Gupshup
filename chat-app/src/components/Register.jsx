import React from 'react'
import { useState } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase/firebase'
import { setDoc, doc } from 'firebase/firestore'

const Register = ({ setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ fullName: "", email: "", password: "" });

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,

    }));

    console.log(userData);

  }

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      // Creating an account for user in authentication 
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      //Creating a doc of user in firestore under the collection 'User'
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        username: user.email?.split('@')[0],
        fullName: userData.fullName,
        image: ''

      })
    }
    catch (error) {
      console.log(error);

    }

    finally {
      setIsLoading(false);
    }
  }
  return (
    <section className='h-[100vh] flex flex-col justify-center items-center background-image'>
      <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center'>
        <div className='mb-10'>
          <h1 className='text-center text-[28px] font-bold'>Sign up</h1>
          <p className='text-center text-sm text-gray-400'>Welcome , create an account to continue</p>
        </div>
        <div className="w-full">
          <input type='text' name='fullName' className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Full name' onChange={handleChangeUserData} />
          <input type='email' name='email' className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Email' onChange={handleChangeUserData} />
          <input type='password' name='password' className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Password' onChange={handleChangeUserData} />
        </div>

        <div className='w-full'>
          <button disabled={isLoading} onClick={handleAuth} className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center '>

            {isLoading ? (
              <>
                Processing...
              </>
            ) : (
              <>
                Register
                <FaUserPlus />
              </>
            )}
          </button>
        </div>

        <div className='mt-5 text-center text-gray-400 text-sm'>
          <button onClick={() => setIsLogin(true)}>Already have an account? Sign In</button>
        </div>
      </div>
    </section>
  )
}

export default Register
