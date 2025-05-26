import React, { useRef, useEffect, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";
import { useSelector } from "react-redux";
import socket from "../utils/socket";

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
      console.log(msg);
      if (msg.userId === userId) {
        setMessages((prevmsg) => [
          ...prevmsg,
          {
            id: prevmsg.length + 1,
            text: msg.message,
            time: new Date().toLocaleTimeString(),
            sender:
              msg.userName === localStorage.getItem("Name") ? "me" : "other",
          },
        ]);
      }
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
      setMessage("");
    };
  }, [userName]);

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
    <div>
      {!isUserSelected ? (
        <div className="w-[70vw] h-screen flex flex-col justify-center items-center text-zinc-400">
          <h2 className="text-xl font-semibold">
            Select a chat to start messaging
          </h2>
          <p className="text-sm mt-2">Your messages will appear here.</p>
        </div>
      ) : (
        <>
          {/* Messages Section */}
          <div className="bg-white w-[63vw] h-[24.5rem] max-md:w-[90vw] rounded-2xl ml-2 mt-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative max-w-xs">
                  <div
                    className={`p-3 rounded-3xl ${
                      msg.sender === "me"
                        ? "bg-[#fe4b09] text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {msg.text && <p>{msg.text}</p>}

                    {msg.type === "image" && msg.images && (
                      <div className="grid grid-cols-2 gap-1">
                        {msg.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="sent-img"
                            className="w-20 h-20 rounded-lg"
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
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="relative flex justify-between items-center ml-2 mt-2">
            <GoPaperclip className="absolute ml-2 z-10" />
            <input
              type="text"
              placeholder="Write messages..."
              onChange={handleChange}
              onBlur={handleInputBlur}
              value={message}
              className="w-[54vw] h-14 relative border bg-white border-none rounded-xl px-12 p-3 outline-none focus:ring-2 focus:ring-blue-600"
            />
            <BsEmojiSmile className="absolute right-[150px]" />

            <div className="flex gap-1">
              <div className="p-4 bg-white rounded-xl">
                <IoMicOutline size={20} />
              </div>
              <div
                className="p-4 bg-[#fe4b09] cursor-pointer rounded-xl"
                onClick={handleSendMessage}
              >
                <IoIosSend size={20} className="text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbox;
