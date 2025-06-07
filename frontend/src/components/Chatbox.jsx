import React, { useRef, useEffect, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import ChatPersonHeader from "./ChatPersonHeader";
import unamed from "../assets/unnamed.png";

const Chatbox = ({ Id }) => {
  const { userName, isUserSelected, userPic, userId } = useSelector(
    (state) => state.user
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleInputBlur = () => {
    socket.emit("stop typing", {
      userName,
      userId: localStorage.getItem("userId"),
      receiverId: userId,
    });
  };

  useEffect(() => {
    if (!Id || !userId || Id === "null" || userId === "null") {
      console.warn("Skipping chat history emit due to invalid IDs", {
        Id,
        userId,
      });
      return;
    }

    socket.emit("chat history", { userId1: Id, userId2: userId });

    socket.on("chat history", (chatHistory) => {
      const formattedMessages = chatHistory.map((msg, index) => ({
        id: index + 1,
        text: msg.content,
        time: new Date(msg.createdAt).toLocaleTimeString(),
        sender: msg.sender === Id ? "me" : "other",
      }));
      setMessages(formattedMessages);
    });

    return () => {
      socket.off("chat history");
    };
  }, [Id, userId]);

  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg.userId === userId) {
        setMessages((prevmsg) => [
          ...prevmsg,
          {
            id: prevmsg.length + 1,
            text: msg.message,
            time: new Date().toLocaleTimeString(),
            sender:
              msg.sender === localStorage.getItem("userId") ? "me" : "other",
          },
        ]);
      }
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.emit("readmessage", {
      userId: Id,
      selectedUserId: localStorage.getItem("userId"),
    });
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      userName,
      userId: localStorage.getItem("userId"),
      receiverId: userId,
    });
  };

  const handleSendMessage = () => {
    if (!Id || !userId || Id === "null" || userId === "null") return;
    if (message.trim() === "") return;

    const newMessage = {
      message,
      userName,
      Id,
      selectedUserId: userId,
    };

    setMessages((prevmsg) => [
      ...prevmsg,
      {
        id: prevmsg.length + 1,
        text: message,
        time: new Date().toLocaleTimeString(),
        sender: "me",
      },
    ]);

    socket.emit("stop typing", {
      userName,
      userId: localStorage.getItem("userId"),
      receiverId: userId,
    });

    socket.emit("chat message", newMessage);
    socket.emit("latest message", { userId: Id });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-[50vw] mx-auto">
  <ChatPersonHeader />
  {!isUserSelected ? (
    <div className="flex-grow flex flex-col justify-center items-center text-zinc-400 px-4 text-center">
      <h2 className="text-xl font-semibold">
        Select a chat to start messaging
      </h2>
      <p className="text-sm mt-2">Your messages will appear here.</p>
    </div>
  ) : (
    <>
      {/* Messages Section */}
      <div className="flex-grow p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-md">
              {msg.sender !== "me" && (
                <img
                  src={`http://localhost:3000/${userPic}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-xl ${
                    msg.sender === "me" ? "bg-[#d2e2f3]" : "bg-[#e9edf1]"
                  }`}
                >
                  {msg.text && (
                    <p className="text-sm text-gray-800 break-words">{msg.text}</p>
                  )}

                  {msg.type === "image" && msg.images && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {msg.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="sent-img"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`text-xs mt-1 flex items-center ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  } text-gray-500`}
                >
                  <span>{msg.time}</span>
                  {msg.sender === "me" && (
                    <LuCheckCheck className="ml-1 text-blue-500" />
                  )}
                </div>
              </div>

              {msg.sender === "me" && (
                <img
                  src={unamed}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="relative flex items-center gap-2 p-4">
        <GoPaperclip className="absolute left-5 z-10 text-gray-500" />
        <input
          type="text"
          placeholder="Type a message..."
          onChange={handleChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          value={message}
          className="flex-grow pl-12 pr-20 py-3 rounded-2xl bg-[#e9edf1] outline-none focus:ring-2 focus:ring-blue-600"
        />
        <BsEmojiSmile className="absolute right-14 text-gray-500" />
        <IoIosSend
          size={26}
          onClick={handleSendMessage}
          className="text-[#4b91dc] cursor-pointer absolute right-5"
        />
      </div>
    </>
  )}
</div>

  );
};

export default Chatbox;
