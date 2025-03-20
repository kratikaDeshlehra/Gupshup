import React from 'react'
import defaultAvatar from '../../public/assests/default.jpg'
import { RiSendPlaneFill } from 'react-icons/ri'
const Chatbox = () => {
  return (
     <section className='flex flex-col items-start justify-start h-screen w-[100%] background-image'>
         <header className='border-b border-gray-400 w-[100%] h-[82px] m:h-fit p-4 bg-white' >
          <main className='flex items-center gap-3'>
            <span>
              <img src={defaultAvatar} alt='' className='w-11 h-11 object-cover rounded-full'/>
            </span> 
            <span>
              <h3 className='font-semibold text-[#2A3D39] text-lg'>Gupshup User</h3>
              <p className='font-light text-[#2A3D39] text-sm'>@gupshup</p>
            </span>
          </main>
         </header> 

         <main className='custom-scrollbar relative h-[100vh] w-[100%] flex flex-col jusify-between'>
            <section className='px-3 pt-5 b-20 lg:pb-10'>
               <div className='overflow-auto h-[80vh]'>
                   <div className='flex flex-col items-end w-full'>   
                      <span className='flex gap-3 w-[40%] h-auto ms-10'>
                        <div>
                          <div className='flex items-center bg-white justify-center p-6 rounded-lg shadow-sm'>
                            <h4>Gupshup User</h4>
                          </div> 
                          <p className='text-gray-400 text-sx mt-3 text-right'>7th feb 2025</p>
                        </div>
                      </span>
                   </div>

                   <div className='flex flex-col items-start w-full'>
                   
        
                      <span className='flex gap-3 w-[40%] h-auto ms-10'>
                        <img src={defaultAvatar} alt='' className='h-11 w-11 object-cover rounded-full'/>
                        <div>
                          <div className='flex items-center bg-white justify-center p-6 rounded-lg shadow-sm'>
                            <h4>Gupshup User</h4>
                          </div> 
                          <p className='text-gray-400 text-sx mt-3 '>7th feb 2025</p>
                        </div>
                      </span>
                   </div>
                  
               </div>
            </section>

             <div className='sticky lg:bottom-0 bottom-[60px] p-3 h-fit w-[100%]'>
              <form className='flex items-center bg-white h-[45px] w-[100%] px-2 rounded-lg relative shadow-lg' >
                <input className='h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-[100%]' type='text' placeholder='Write your message...'/>
                <button className='flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]'>
                  <RiSendPlaneFill color='#01AA85'/>
                </button>
              </form>
             </div>
         </main>

       
     </section>
  )
}

export default Chatbox
