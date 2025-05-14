import React from 'react'
import ChatOptionsDropdown from './ChatOptionsDropdown';

const ChatHeader = () => {
 
 
  return (
    <div className='bg-white w-[30vw] max-md:w-[80vw] h-[80px] rounded-3xl ml-2 flex items-center justify-between px-4'>
        <span className='font-bold text-xl'>Chats</span>
        {/* Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="w-[20vw] max-md:w-[50vw] px-4 py-2 rounded-3xl border-gray-300 border focus:outline-none"
          />
          {/* <div 
          className='bg-[#fe4b09] w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold'
          >
          <AiOutlinePlus/>
          </div> */}
          <ChatOptionsDropdown/>

    </div>
    </div>
  )
}

export default ChatHeader