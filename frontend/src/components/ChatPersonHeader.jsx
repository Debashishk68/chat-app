import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropDown";

const ChatPersonHeader = () => {
  const { userName, isUserSelected, userPic } = useSelector(
    (state) => state.user
  );
  const { isGroupSelected, groupName, groupPic } = useSelector(
    (state) => state.group
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!isUserSelected && !isGroupSelected) return null;

  return (
    <div className="bg-white w-[63vw] max-md:w-[90vw] rounded-2xl ml-2 mt-1 ">
      <div className="flex items-center justify-between p-3">
        {/* Left Side  Profile Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={`http://localhost:3000/${
                isUserSelected ? userPic : isGroupSelected ? groupPic : null
              }`}
              alt="Bella Huffman"
              className="w-12 h-12 max-md:w-[10vw] max-md:h-[10vw] rounded-full border border-gray-300 object-cover"
            />
            {/* Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3  max-md:w-2 max-md:h-2 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 max-md:text-[10px] ">
              {isUserSelected ? userName : isGroupSelected ? groupName : null}
            </h4>
            {/* <p className="text-sm text-gray-500 max-md:text-[7px] dark:text-gray-400">
              Online
            </p> */}
          </div>
        </div>

        {/* Right Side - Call & More Options */}
        <div className="flex items-center space-x-3">
          <span
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              console.log(isProfileOpen);
            }}
            className="border-[1px] cursor-pointer px-5 border-zinc-300 py-[8px] max-md:py-[5px] max-md:px-2 max-md:text-[8px] font-medium text-[14px] rounded-4xl"
          >
            Profile
          </span>
          <ProfileDropdown
            isOpen={isProfileOpen}
            data={{
              userName: userName,
              userPic: userPic,
            }}
            onClose={() => setIsProfileOpen(false)}
          />

          <span className="border-[1px] px-5 bg-black text-white py-[8px] max-md:py-[5px] max-md:px-4 max-md:text-[8px] font-medium text-[14px] rounded-4xl">
            Call
          </span>
          <div className="border-l-[1px] h-9 border-zinc-300 flex items-center space-x-3 mr-5">
            <FiSearch size={20} className="ml-3 max-md:w-[12px] " />
            {/* <BsThreeDots size={20} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPersonHeader;
