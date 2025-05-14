import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import useUsers from "../hooks/useUsers";
import socket from "../utils/socket";
import { setPersons } from "../features/persons/personSlice";

const ChatPersons = ({ Id }) => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [latestChats, setLatestChats] = useState([]);
  const [typingUserId, setTypingUserId] = useState(null);
  const { selectedItem } = useSelector((state)=>state.sidebar)

  const { data, isSuccess } = useUsers();
  
   


  // Load all users

  useEffect(() => {
    if (isSuccess && data?.users) {
      setChats(data.users); 
      dispatch(setPersons({personsData:data.users}));
    }
  }, [isSuccess, data]);
  


  // Listen for latest messages
  useEffect(() => {
    if (!Id || Id === "null") return;

    socket.emit("latest message", { userId: Id });

    const handleLatestMessage = (msg) => {
      setLatestChats(msg);
    };

    socket.on("latest message", handleLatestMessage);

    return () => {
      socket.off("latest message", handleLatestMessage);
    };
  }, [Id]);

  // Handle typing indicators
  useEffect(() => {
    const handleTyping = (data) => {
      setTypingUserId(data.from);
    };

    const handleStopTyping = (data) => {
      if (typingUserId === data.from) {
        setTypingUserId(null);
      }
    };

    socket.on("user typing", handleTyping);
    socket.on("user stop typing", handleStopTyping);

    return () => {
      socket.off("user typing", handleTyping);
      socket.off("user stop typing", handleStopTyping);
    };
  }, [typingUserId]);

  const handleClick = (name, avatar, index, userId) => {
    setSelectedChat(index);
    dispatch(setUser({ userName: name, userPic: avatar, userId }));
  };

 
  const ChatPerson = ({ name, profileImg, userId, index, active }) => {
    const latest = latestChats.find(
      (chat) => chat.chatPartner._id === userId
    );

    return (
      <div
        className={`flex items-center p-3 cursor-pointer transition-all rounded-lg ${
          active ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        onClick={() => handleClick(name, profileImg, index, userId)}
      >
        <div className="w-12 h-12 relative">
          <img
            src={`http://localhost:3000/${profileImg}`}
            alt={name}
            className="w-full h-full rounded-full border border-gray-300 object-cover"
          />
        </div>

        <div className="ml-3 flex-1">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500 truncate max-w-[200px]">
            {typingUserId === userId ? (
              <span className="text-[#fe4b09]">typing...</span>
            ) : (
              latest?.content || "No messages yet"
            )}
           
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">
            {latest?.createdAt
              ? new Date(latest.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white w-[30vw] max-md:w-[80vw] h-[82%] mt-1 ml-2 rounded-xl shadow-md">
      <h2 className="text-[15px] font-light ml-5 pt-3 text-gray-600 mb-4">
        
        {selectedItem==="chat"?"Chats":selectedItem==="group"?"Groups":null}
        
      </h2>

      <div className="space-y-2 h-[32vw] max-md:h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {chats.map((chat, index) => (
          <ChatPerson
            key={chat._id}
            index={index}
            name={chat.name}
            userId={chat._id}
            profileImg={chat.profileImg}
            active={selectedChat === index}
          />
        ))}
      </div>
    </div>
  );
}




export default ChatPersons;
