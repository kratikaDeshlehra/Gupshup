import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { sendMessage } from '../Firebase/firebase';

const MessageSuggesstions = ({ setSelectedMessageIndex, aiResponses ,setAIResponses,data,loading,setLoading}) => {

   const handleQuickReply = async (reply) => {
      await sendMessage(reply, data.chatID, data.user1, data.user2);
      setAIResponses([]);
      setSelectedMessageIndex(null);
    }

  return (
    <div className="bg-[#01AA85] mt-4 rounded-md ">

      <button className='text-white p-2 ' onClick={() =>{ 
        setSelectedMessageIndex(null);
        setAIResponses([]);
        setLoading(false);
        }}>
          <FaXmark size={20} /></button>
     <div className='p-2.5'>
     {loading ? (
          <p className="text-white text-center">Loading...</p> 
        ) : (
          aiResponses.map((reply, idx) => (
            <button
              onClick={() => handleQuickReply(reply)}
              key={idx}
              className="block w-full text-left p-2 hover:bg-gray-200 bg-[#15eabc34] p-1.5 mb-3 rounded-lg cursor-pointer border border-[#ffffff20] shadow-xl"
            >
              {reply}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default MessageSuggesstions
