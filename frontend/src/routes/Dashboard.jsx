import { useEffect, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatPersons from "../components/ChatPersons";
import GroupChatbox from "../components/GroupChat";
import Chatbox from "../components/Chatbox";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import Groups from "../components/Groups";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    mutate: fetchDashboard,
    isPending,
    isError,
    data,
    isSuccess,
    error,
  } = useDashboard();

  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [isTabSize, setIsTabSize] = useState(false);

  const { isUserSelected } = useSelector((state) => state.user);
  const { selectedItem } = useSelector((state) => state.sidebar);
  const { isGroupSelected } = useSelector((state) => state.group);

  // Initial Dashboard fetch
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Redirect on error
  useEffect(() => {
    if (isError && error?.message === "You are not Login") {
      setTimeout(() => {
        localStorage.removeItem("userId");
        navigate("/login");
      }, 2000);
    }
  }, [isError, error, navigate]);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      setIsTabSize(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup socket on success
  useEffect(() => {
    if (isSuccess && data?.userName) {
      setId(data.user);
      socket.connect();
      socket.emit("register", { userId: data.user });
      localStorage.setItem("userId", data.user);

      return () => {
        socket.off("connect");
      };
    }
  }, [isSuccess, data]);

  const shouldHideLeftPanel = isTabSize && (isUserSelected || isGroupSelected);

  return (
    <div className="flex h-screen bg-slate-50">
      {isPending && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

      {!isPending && !isError && (
        <>
          <Sidebar />

          {!shouldHideLeftPanel && (
            <div className="w-full h-screen max-md:w-[100vw] flex flex-col">
              <ChatHeader />
              {selectedItem === "chats" && <ChatPersons Id={id} />}
              {selectedItem === "group" && <Groups />}
            </div>
          )}

          <div className="h-screen">
            {isUserSelected && <Chatbox Id={id} />}
            {isGroupSelected && <GroupChatbox Id={id} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
