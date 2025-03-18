import React from 'react'
import { RiSearchLine } from 'react-icons/ri'

const SearchModal = () => {
  return (
    <div>
        <button className='bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg'>
            <RiSearchLine color='#01AA85' className='w-[18px] h-[18px]'/>
        </button>
    </div>
  )
}

export default SearchModal
