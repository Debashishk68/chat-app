import React, { useEffect, useRef, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import formatDate from "../utils/convertTime";
import convertToTime from "../utils/getTIme";

const GroupChatbox = () => {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { isGroupSelected, groupName, groupPic, groupId } = useSelector(
    (state) => state.group
  );
  const currentUserId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    socket.emit("group-chat", {
      message,
      groupId,
      senderId: currentUserId,
    });
    const newMsg = {
      id: messages.length + 1,
      text: message,
      time: new Date(),
      sender: "me",
      senderName: "You",
      senderPic: "https://i.pravatar.cc/150?img=3",
    };

    socket.emit("getLastChat")
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  useEffect(() => {
    if (groupId) {
      socket.emit("join-room", groupId);
    }
  }, [groupId]);

  useEffect(() => {
    socket.emit("group-chat-history", { groupId });
    socket.on("group-chat-history", (data) => {
      setMessages(data);
    });
  }, [groupId]);

  useEffect(() => {
    socket.on("group-chat", (data) => {
      const isSender = data.senderId === currentUserId;

      if (!isSender) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("group-chat");
  }, [currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-5xl mx-auto p-2 flex flex-col justify-between">
      {/* Chat Messages */}
      <div className="bg-white rounded-2xl h-96 p-4 overflow-y-auto shadow-md flex flex-col gap-3">
        {messages.map((msg, index) => {
          const isMe = msg.sender === "me" || msg.senderId?._id === currentUserId;

          const currentDate = formatDate(msg.time);
          const prevDate = index > 0 ? formatDate(messages[index - 1].time) : null;
          const showDateHeader = currentDate !== prevDate;

          return (
            <React.Fragment key={msg.id || index}>
              {showDateHeader && (
                <div className="flex justify-center my-2">
                  <span className="bg-gray-200 p-1 rounded text-zinc-700 text-xs">
                    {currentDate}
                  </span>
                </div>
              )}

              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-2 max-w-xs">
                  {!isMe && (
                    <img
                      src={`http://localhost:3000/${msg.senderPic || msg.senderId?.profileImg}`}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    {!isMe && (
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        {msg.senderName}
                      </p>
                    )}
                    <div
                      className={`p-3 rounded-3xl ${
                        isMe
                          ? "bg-[#fe4b09] text-white rounded-br-none"
                          : "bg-gray-200 text-black rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div
                      className={`text-xs mt-1 flex items-center ${
                        isMe ? "justify-end" : "justify-start"
                      } text-gray-500`}
                    >
                      <span>{convertToTime(msg.time)}</span>
                      {isMe && <LuCheckCheck className="ml-1 text-blue-500" />}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="mt-3 flex items-center gap-3">
        <div className="relative w-full">
          <GoPaperclip className="absolute top-4 left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Write messages..."
            value={message}
            onChange={handleChange}
            className="w-full h-14 pl-12 pr-12 rounded-xl border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-600"
          />
          <BsEmojiSmile className="absolute top-4 right-4 text-gray-500" />
        </div>
        <div className="flex gap-2">
          <div className="p-4 bg-white rounded-xl shadow cursor-pointer">
            <IoMicOutline size={20} />
          </div>
          <div
            className="p-4 bg-[#fe4b09] rounded-xl shadow cursor-pointer"
            onClick={handleSendMessage}
          >
            <IoIosSend size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatbox;
