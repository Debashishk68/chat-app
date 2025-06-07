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
   <div className="bg-white w-full">
  <div className="flex items-center justify-between px-4 py-3 max-md:px-2 max-md:py-2">
    {/* Left Side - Profile Info */}
    <div className="flex items-center space-x-3 max-md:space-x-2">
      <div className="relative">
        <img
          src={`http://localhost:3000/${
            isUserSelected ? userPic : isGroupSelected ? groupPic : null
          }`}
          alt="Profile"
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-gray-300 object-cover"
        />
        {/* Green Online Dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 max-md:w-2 max-md:h-2 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-base max-md:text-sm truncate max-w-[120px]">
          {isUserSelected ? userName : isGroupSelected ? groupName : null}
        </h4>
      </div>
    </div>

    {/* Right Side - Profile Button and Dropdown */}
    <div className="flex items-center space-x-3 max-md:space-x-2">
      <span
        onClick={() => {
          setIsProfileOpen(!isProfileOpen);
          console.log(isProfileOpen);
        }}
        className="border border-zinc-300 px-4 py-2 max-md:px-2 max-md:py-1 text-sm max-md:text-[10px] cursor-pointer rounded-3xl"
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
    </div>
  </div>
</div>

  );
};

export default ChatPersonHeader;
