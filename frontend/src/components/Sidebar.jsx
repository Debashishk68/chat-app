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
import home from "../assets/home.svg";
import chats from "../assets/chats.svg";
import calls from "../assets/calls.svg";
import spaces from "../assets/spaces.svg";
import settings from "../assets/settings.svg";
import unamed from "../assets/unnamed.png";

const Sidebar = () => {
  const [active, setActive] = useState("chats");
  const dispatch = useDispatch();
  const [hamburger, setHamburger] = useState(true);

  const handleClick = (id) => {
    setActive(id);
    dispatch(setSelectedItem(id));
    dispatch(removeUser());
    dispatch(removeGroup());
  };

  useEffect(() => {
    dispatch(setSelectedItem("chats"));
  }, []);

  const menuItems = [
    { id: "home", icon: home, tooltip: "Home" },
    { id: "chats", icon: chats, tooltip: "Chats" },
    { id: "spaces", icon: spaces, tooltip: "Spaces" },
    // { id: "settings", icon: settings, tooltip: "Settings" },
  ];

  // return (
  //   <div className="h-screen w-16 bg-black flex flex-col items-center py-6 space-y-6 rounded-xl">
  //     {/* Logo */}
  //     <div className="w-10 h-10 bg-[#fe4b09] rounded-full flex items-center justify-center text-white text-lg font-bold">
  //       <span>*</span>
  //     </div>

  //     {/* Navigation Icons */}
  //     <div className="flex flex-col space-y-2 justify-center flex-grow">
  //       {menuItems.map((item) => (
  //         <div
  //           key={item.id}
  //           className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer text-gray-400 hover:bg-gray-700 hover:text-white"
  //           onClick={() => {handleClick(item.id)}}
  //           title={item.tooltip}
  //         >
  //           <item.icon
  //             size={20}
  //             className={`${active === item.id ? "text-[#eb4a25]" : "text-gray-400"}`}
  //           />
  //         </div>
  //       ))}
  //     </div>

  //     {/* User Profile */}
  //     <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-700 overflow-hidden cursor-pointer border-2 border-gray-500 hover:border-[#eb4a25]">

  //       <GoPerson size={20} className="text-white object-cover"/>
  //     </div>
  //   </div>
  // );
  return (
    <div className={`w-52  ${hamburger ? "absolute w-34 z-20" : "null"} sm:relative flex h-screen flex-col justify-between bg-slate-50 p-4`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Avatar and name */}
          <div className="flex gap-3 ">
            <img
              src={unamed}
              alt="User Avatar"
              onClick={() => setHamburger(!hamburger)}
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full cursor-pointer"
            />
            <span
              className={`text-[#0d141c] text-sm font-medium leading-normal transition-all duration-300 ${
                hamburger
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              sophie
            </span>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center ${
                !hamburger ? "justify-center" : "justify-start"
              } gap-3 sm:px-3 sm:py-2 rounded-full cursor-pointer ${
                active === item.id ? "bg-[#e7edf4]" : ""
              }`}
              onClick={() => handleClick(item.id)}
            >
              <div
                className="text-[#0d141c]"
                // data-icon={item.icon}
                // data-size="24px"
                // data-weight="regular"
              >
                <img src={item.icon} alt={item.tooltip} className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span
                className={`text-[#0d141c] text-sm font-medium leading-normal transition-all duration-300 ${
                  hamburger
                    ? "opacity-100 max-w-[200px]"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                {item.tooltip}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Option */}
      {/* <div className="flex flex-col gap-4"> */}
        {/* <div className="flex flex-col gap-1"> */}
          <div className={`flex ${!hamburger ? "justify-center" : "justify-start"} items-center gap-3 px-3 py-2`}>
            <div
              className="text-[#0d141c]"
              data-icon="Gear"
              data-size="24px"
              data-weight="regular"
            >
              <img src={settings} alt="settings" className="w-6 h-6" />
            </div>
            <span
              className={`text-[#0d141c] text-sm font-medium leading-normal transition-all duration-300 ${
                hamburger
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              Settings
            </span>
          </div>
        </div>
      // </div>
    // </div>
  );
};

export default Sidebar;
