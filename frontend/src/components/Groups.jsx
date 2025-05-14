import React, { useEffect, useState } from "react";
import { setGroup } from "../features/groups/groupSlice";
import { useDispatch } from "react-redux";
import socket from "../utils/socket";

const Groups = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [typingUserId, setTypingUserId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [lastChat, setLastChat] = useState(null);

  const dispatch = useDispatch();

  // const groups = [
  //   {
  //     _id: "g1",
  //     name: "Study Buddies",
  //     profileImg: "https://i.pravatar.cc/150?img=5",
  //     latestMsg: "Zoom at 5 PM?",
  //     createdAt: new Date().toISOString(),
  //   },
  //   {
  //     _id: "g2",
  //     name: "Dev Squad",
  //     profileImg: "https://i.pravatar.cc/150?img=6",
  //     latestMsg: "Code review done!",
  //     createdAt: new Date().toISOString(),
  //   },
  // ];

  useEffect(() => {
     socket.emit("getGroup", { userId: localStorage.getItem("userId") });
     socket.on("getGroup", (data) => {
      // console.log("Group data received:", data);
      if (data) {
        setGroups(data);
      }
    });
  
    return ()=> {
      socket.off("getGroup");
    };
  }, [])
   useEffect(() => {
      socket.emit("getLastChat");

    
    socket.on("getLastChat",(data) => {
      console.log("Received last chat data:", data);
      if (data) {
      setLastChat(data);
      }
    })
    return () => {
      socket.off("getLastChat");
    }
  }, []);

  const handleClick = (index, group) => {
    setSelectedChat(index);
    // console.log("Selected:", group.profileImg);
    dispatch(setGroup({groupName:group.name,groupPic:group.groupImage,groupId:group._id}));
  };

  return (
    <div className="bg-white w-[30vw] max-md:w-[80vw] h-[82%] mt-1 ml-2 rounded-xl shadow-md">
      <h2 className="text-[15px] font-light ml-5 pt-3 text-gray-600 mb-4">
        Groups
      </h2>

      <div className="space-y-2 h-[32vw] max-md:h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
     
        {groups.map((group, index) => (
          <div
            key={group._id}
            onClick={() => handleClick(index, group)}
            className={`flex items-center p-3 cursor-pointer transition-all rounded-lg ${
              selectedChat === index ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <div className="w-12 h-12 relative">
              <img
                src={`http://localhost:3000/${group.groupImage}`}
                alt={group.name}
                className="w-full h-full rounded-full border border-gray-300 object-cover"
              />
            </div>

            <div className="ml-3 flex-1">
              <h4 className="font-semibold text-gray-900">{group.name}</h4>
              <p className="text-sm text-gray-500 truncate max-w-[200px]">
                {typingUserId === group._id ? (
                  <span className="text-[#fe4b09]">typing...</span>
                ) : (
                  lastChat.map(msg => (
                    <div key={msg.id} className="text-sm text-gray-500 truncate max-w-[200px]">
                      {msg.groupId === group._id ?(
                        <div> {msg.senderDetails.name}: {msg.text}</div>
                      ): "No messages yet"}
                     

                    </div>
                  )) 
                )}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                {group.createdAt
                  ? new Date(group.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
