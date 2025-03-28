import React, { useEffect, useRef } from 'react'
import { useState, useMemo } from 'react'
import defaultAvatar from '../assets/default.jpg'
import { RiSendPlaneFill } from 'react-icons/ri'
import messageData from '../data/messageData'
import { formatTimestamp } from '../utils/formatTimestamp'
const Chatbox = ({selectedUser}) => {
  const [messages, setMessages] = useState([]);
  const [messageText,sendMessageText]=useState("");
  const senderEmail = 'baxo@mailinator.com';

  const scrollRef=useRef(null);

  useEffect(() => {
    setMessages(messageData);
  }, []);

  useEffect(()=>{
         if(scrollRef.current) {
          scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
         }
  },[messages]);

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp = a.timestamp.seconds + a.timestamp.nanoseconds / 1e9;
      const bTimestamp = b.timestamp.seconds + b.timestamp.nanoseconds / 1e9;

      return  aTimestamp-bTimestamp;
    })
  }, [messages]); 

  const handleSendMessage=(e)=>{
    e.preventDefault();
    
    const newMessage={
      sender: senderEmail,
      text:messageText,
      timestamp :{
        seconds: Math.floor(Date.now()/1000),
        nanoseconds:0,
      }

    };
    setMessages((prev)=>[...prev,newMessage]);
    sendMessageText("");


  }
  return (
    <section className='flex flex-col items-start justify-start h-screen w-[100%] background-image'>
      <header className='border-b border-gray-400 w-[100%] h-[82px] m:h-fit p-4 bg-white' >
        <main className='flex items-center gap-3'>
          <span>
            <img src={selectedUser?.image || defaultAvatar} alt='' className='w-11 h-11 object-cover rounded-full' />
          </span>
          <span>
            <h3 className='font-semibold text-[#2A3D39] text-lg'>{selectedUser?.fullName || "Gupshup User"}</h3>
            <p className='font-light text-[#2A3D39] text-sm'>{selectedUser?.username || "Gupshup"}</p>
          </span>
        </main>
      </header>

      <main className='custom-scrollbar relative h-[100vh] w-[100%] flex flex-col jusify-between'>
        <section className='px-3 pt-5 b-20 lg:pb-10'>
          <div ref={scrollRef} className='overflow-auto h-[80vh]'>
            {sortedMessages?.map((msg, index) => (
              <>
                {msg?.sender === senderEmail ? <div className='flex flex-col items-end w-full'>
                  <span className='flex gap-3 h-auto me-10'>
                    <div>
                      <div className='flex items-center bg-white justify-center p-4 rounded-lg shadow-sm'>
                        <h4>{msg.text}</h4>
                      </div>
                      <p className='text-gray-400 text-sx mt-3 text-right'>{formatTimestamp(msg?.timestamp)}</p>
                    </div>
                  </span>
                </div> : <div className='flex flex-col items-start w-full'>
                  <span className='flex gap-3 w-[40%] h-auto ms-10'>
                    <img src={defaultAvatar} alt='' className='h-11 w-11 object-cover rounded-full' />
                    <div>
                      <div className='flex items-center bg-white justify-center p-4 rounded-lg shadow-sm'>
                        <h4>{msg.text}</h4>
                      </div>
                      <p className='text-gray-400 text-sx mt-3 '>{formatTimestamp(msg?.timestamp)}</p>
                    </div>
                  </span>
                </div>}

              </>
            ))}
          </div>
        </section>

        <div className='sticky lg:bottom-0 bottom-[60px] p-3 h-fit w-[100%]'>
          <form onSubmit={handleSendMessage} className='flex items-center bg-white h-[45px] w-[100%] px-2 rounded-lg relative shadow-lg' >
            <input value={messageText} onChange={(e)=> sendMessageText(e.target.value)}className='h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-[100%]' type='text' placeholder='Write your message...' />
            <button type='submit'className='flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]'>
              <RiSendPlaneFill color='#01AA85' />
            </button>
          </form>
        </div>
      </main>


    </section>
  )
}

export default Chatbox
