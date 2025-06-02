import { useEffect, useState } from "react";
import { FiMessageSquare, FiBell, FiSettings } from "react-icons/fi";
import { RiMessageFill, RiSettings5Fill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { setSelectedItem } from "../features/sidebar/sideBarSlice";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/user/userSlice";
import { FaUserGroup } from "react-icons/fa6";
import { removeGroup } from "../features/groups/groupSlice";


const Sidebar = () => {
  const [active, setActive] = useState("chat");
  const dispatch= useDispatch();

  const handleClick=(id)=>{
    setActive(id);
    dispatch(setSelectedItem(id));
    dispatch(removeUser())
    dispatch(removeGroup());

  }

  useEffect(() => {
    dispatch(setSelectedItem("chat"));

  }, [])
  

  const menuItems = [
    { id: "chat", icon: active === "chat" ? RiMessageFill : FiMessageSquare, tooltip: "Chat" },
    { id: "group", icon: active === "group" ? FaUserGroup : FaUserGroup , tooltip: "group" },
    { id: "notifications", icon: active === "notifications" ? FaBell : FiBell, tooltip: "Notifications" },
    { id: "settings", icon: active === "settings" ? RiSettings5Fill : FiSettings, tooltip: "Settings" },
  ];

  return (
    <div className="h-screen w-16 bg-black flex flex-col items-center py-6 space-y-6 rounded-xl">
      {/* Logo */}
      <div className="w-10 h-10 bg-[#fe4b09] rounded-full flex items-center justify-center text-white text-lg font-bold">
        <span>*</span>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-2 justify-center flex-grow">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={() => {handleClick(item.id)}}
            title={item.tooltip}
          >
            <item.icon
              size={20}
              className={`${active === item.id ? "text-[#eb4a25]" : "text-gray-400"}`}
            />
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-700 overflow-hidden cursor-pointer border-2 border-gray-500 hover:border-[#eb4a25]">
    
        <GoPerson size={20} className="text-white object-cover"/>
      </div>
    </div>
  );
};

export default Sidebar;
