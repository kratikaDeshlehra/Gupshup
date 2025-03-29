import React, { useMemo } from 'react'
import defaultAvatar from '../assets/default.jpg'
import { RiMore2Fill } from "react-icons/ri";
import SearchModal from '../components/SearchModal.jsx'
import { useState, useEffect } from 'react';
import { formatTimestamp } from '../utils/formatTimestamp.js'
import { auth, db, listenForChats } from '../Firebase/firebase.js';
import { doc, onSnapshot } from 'firebase/firestore';
const Chatlist = ({ setSelectedUser }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setUser(doc.data());
    });
    return unsubscribe;

  }, [])

  useEffect(() => {
    const unsubscribe = listenForChats(setChats);
    return () => {
      unsubscribe(); // clean up 
    }
  }, []);

  const startChat = (user) => {
    setSelectedUser(user);
  }

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const aTimestamp = a.lastMessageTimestamp
        ? a.lastMessageTimestamp.seconds + a.lastMessageTimestamp.nanoseconds / 1e9
        : 0;

      const bTimestamp = b.lastMessageTimestamp
        ? b.lastMessageTimestamp.seconds + b.lastMessageTimestamp.nanoseconds / 1e9
        : 0;

      return bTimestamp - aTimestamp;
    })
  }, [chats])

  return (
    <section className='relative hidden lg:flex flex-col item-start justify-start bg-white h-[100vh] w-[100%] md:w-[600px]'>
      <header className='flex items-center justify-between w-[100%] lg:border-b border-b-1 border-[#898989b9] p-4 sticky md:static top-0 z-[100]'>
        <main className='flex items-center gap-3'>
          <img src={defaultAvatar} className='w-[44px] h-[44px] object-cover rounded-full' alt='' />
          <span>
            <h3 className='p-0 font-semibold text=[#2A3D39] md:text-[17px]'>{user?.fullName || 'Gupshup User'}</h3>
            <p className='p-0 font-light text-[#2A3D39] text-[15px]'>@{user?.username || "Gupshup"}</p>
          </span>
        </main>

        <button className='bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg'>
          <RiMore2Fill color='#01AA85' className='w-[28px] h-[28px] ' />
        </button>

      </header>

      <div className='w-[100%] mt-[10px] px-5'>
        <header className='flex items-center justify-between '>
          <h3 className='text-[16px]'>Messages ({chats?.length || 0})</h3>
          <SearchModal startChat={startChat} />
        </header>
      </div>

      <main className='flex flex-col items-start mt-[1.5rem] pb-3'>
        {sortedChats?.map((chat) => (
          <>
            <button key={chat?.uid} className='flex items-start justify-between w-[100%] border-b border-[#9090902c] px-5 pb-3 pt-3'>
              {chat.users?.filter((user) => user?.email !== auth.currentUser.email)?.map(
                (user) => (
                  <>
                    <div className='flex items-start gap-3 ' onClick={() => startChat(user)}>
                      <img src={user.image || defaultAvatar} className='h-[40px] w-[40px]  rounded-full object-cover' alt='' />
                      <span>
                        <h2 className='p-0 font-semibold text-[#2A3d39] text-left text-[17px]'>{user.fullName || 'Gupshup User'}</h2>
                        <p className='p-0 font-light text-[#2A3d39] text-left text-[14px]'>{chat.lastMessage}</p>
                      </span>
                    </div>

                    <p className='p-0 font-regular text-gray-400 text-left text-[11px]'>{formatTimestamp(chat?.lastMessageTimestamp)} </p>

                  </>
                )


              )}
            </button>

          </>

        ))}

      </main>
    </section>
  )
}

export default Chatlist
