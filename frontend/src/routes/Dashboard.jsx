import { useEffect, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatPersons from "../components/ChatPersons";
import ChatPersonHeader from "../components/ChatPersonHeader";
import Chatbox from "../components/Chatbox";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import Groups from "../components/Groups";
import GroupChatbox from "../components/GroupChat";

const Dashboard = () => {
  const {
    mutate: Dashboard,
    isPending,
    isError,
    data,
    isSuccess,
  } = useDashboard();
  const [id, setId] = useState(null);
  const [isTabSize, setIsTabSize] = useState(false);
  const { isUserSelected } = useSelector((state) => state.user);
  const { selectedItem } = useSelector((state) => state.sidebar);
  const { isGroupSelected } = useSelector((state) => state.group);


  useEffect(() => {
    Dashboard();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTabSize(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSuccess && data?.userName) {
      setId(data.user);
      socket.connect();
      socket.emit("register", { userName: data.userName });
      localStorage.setItem("userId", data.user);


  return () => {
    socket.off("connect"); 
  }


    }
  }, [isSuccess, data]);

  return (
    <div className="flex bg-[#eeefef]">
      {isPending && <div>Loading...</div>}
      {isError && <div>Error...</div>}

      {!isPending && !isError && (
        <>
          <Sidebar />
          <div>
            {isUserSelected && isTabSize ? null : <ChatHeader />}

            {selectedItem === "chat" ? (
              isUserSelected && isTabSize ? null : (
                <ChatPersons Id={`${id}`} />
              )
            ) : selectedItem === "group" ? (
              <Groups/>
            ) : null}
          </div>
          <div>
            <ChatPersonHeader />
            {isUserSelected ? <Chatbox Id={`${id}`} /> : isGroupSelected ? <GroupChatbox Id={`${id}`} /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
