import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import CreateGroupModal from "./CreateGroupModal";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import { v4 as uuidv4 } from 'uuid';


const ChatOptionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { personsData} = useSelector((state)=>state.persons);

  // console.log(personsData)

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const DummyUsers = [
    { _id: "1", name: "Alice" },
    { _id: "2", name: "Bob" },
    { _id: "3", name: "Charlie" },
  ];

  const currentUserId = localStorage.getItem('userId');

  const options = [
    {
      label: "Create New Group",
      onClick: () => {
        setShowModal(true);
        alert("Create Group clicked");
      },
    },
    { label: "Add Contact", onClick: () => alert("Add Contact clicked") },
    { label: "Settings", onClick: () => alert("Settings clicked") },
  ];
  const handleCreateGroup = (groupData) => {
    // console.log("Group created with:", groupData.file.name);
    const newRoomId = uuidv4();
    console.log(newRoomId);
    socket.emit("joinGroup",{groupData,newRoomId});

  };

  return (
    <div className="relative inline-block cursor-pointer text-left">
      <div
        onClick={() => {
          handleClick();
        }}
        className="bg-[#fe4b09] w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold"
      >
        <AiOutlinePlus />
      </div>
      {showModal && (
        <CreateGroupModal
          users={personsData}
          currentUserId={currentUserId}
          onCreateGroup={handleCreateGroup}
          onClose={() => setShowModal(false)}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 z-50"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-sm hover:bg-gray-200 cursor-pointer transition"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatOptionsDropdown;
