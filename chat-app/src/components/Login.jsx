import React from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useState } from 'react';
const Login = () => {

   const [userData,setUserData]=useState({email:"",password:""});
  
    const handleChangeUserData=(e)=>{
       const {name,value}=e.target;
       setUserData((prevState)=>({
               ...prevState,
               [name]:value,
               
       })); 
  
       console.log(userData);
  
    } 
  
    const handleAuth=async()=>{
     try{
     alert('Login successful');
      } 
    catch(error){
      console.log(error);
    }
    }
  return (
        <section className='h-[100vh] flex flex-col justify-center items-center background-image'>
                <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center'>
                  <div className='mb-10'>
                      <h1 className='text-center text-[28px] font-bold'>Sign In</h1>
                      <p className='text-center text-sm text-gray-400'>Welcome back, Login In to continue</p>
                  </div>
                  <div className="w-full">
                    <input type='email' name='email' className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Email' onChange={handleChangeUserData}/>
                    <input type='password' name='password'className='border border-green-500 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]' placeholder='Password' onChange={handleChangeUserData}/>   
                  </div> 
      
                  <div className='w-full'>
                    <button onClick={handleAuth}className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center ' >  Login In
                      <FaSignInAlt/>
                    </button>
                  </div>
                   
                   <div className='mt-5 text-center text-gray-400 text-sm'>
                    <button>Don't have an account yet? Sign up</button>
                   </div>
                </div>
            </section>
  )
}
export default Login;
