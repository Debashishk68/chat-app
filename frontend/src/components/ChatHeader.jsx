import React from "react";
import ChatOptionsDropdown from "./ChatOptionsDropdown";
import search from "../assets/search.svg";

const ChatHeader = () => {
  // return (
  //   <div className='bg-white w-[30vw] max-md:w-[80vw] h-[80px] rounded-3xl ml-2 flex items-center justify-between px-4'>
  //       <span className='font-bold text-xl'>Chats</span>
  //       {/* Input Box */}
  //       <div className="flex items-center space-x-2">
  //         <input
  //           type="text"
  //           placeholder="Search"
  //           className="w-[20vw] max-md:w-[50vw] px-4 py-2 rounded-3xl border-gray-300 border focus:outline-none"
  //         />
  //         {/* <div
  //         className='bg-[#fe4b09] w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold'
  //         >
  //         <AiOutlinePlus/>
  //         </div> */}
  //         <ChatOptionsDropdown/>

  //   </div>
  //   </div>
  // )
  return (
    <div className={`bg-slate-50 w-full p-4`}>
      <div className="flex justify-between">
        <span className="text-3xl leading-normal font-medium font-sans">
          Chats
        </span>
        <button className="bg-[#e7edf4] text-sm w-fit h-fit rounded-full px-3 py-2 font-medium">
          Add friend
        </button>
      </div>
      <div className="relative w-full max-w-md mt-4 mx-auto">
        <img
          src={search}
          alt="search"
          className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#e7edf4] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
