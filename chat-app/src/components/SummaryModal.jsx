 
import { FaXmark } from "react-icons/fa6";

  const SummaryModal=({summary,setShowSummaryModal,showSummaryModal,setSummary})=>{
     return (

        <div className='fixed inset-0 z-[100] flex justify-center items-center bg-[#00170cb7] '>
          <div className='relative p-4 w-full max-w-md max-h-full'>
            <div className='relative bg-[#01AA85] w-[100%] rounded-md shadow-lg h-[45vh]'>
              <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-300'>
                <h3 className='text-xl font-bold text-white'>AI generated summary of your chat !</h3>
                <button className='text-white bg-transparent hover:bg-[#d9f2ed] hover:text-[#01AA85] rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center' onClick={()=> {
                  setShowSummaryModal(!showSummaryModal);
                  setSummary("");
                  }}><FaXmark size={20} /></button>
              </div>
              <div className="text-white cursor-pointer text-lg m-2 p-2 overflow-y auto max-h-[30vh] flex-1 overflow-y-auto max-h-[30vh] p-4">
              <p >{summary ? summary : "Loading..."}</p>
              </div>
              
            </div>
          </div>
        </div>
            )
      }

      export default SummaryModal;
    