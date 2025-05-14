const {
  getChatHistory,
  getLastMessages,
  getLastChatsForAllGroups,
} = require("../controllers/messageController");
const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const userModel = require("../models/userModel");
const groupChatModel = require("../models/groupChatModel");

const users = {};

// Helper function to validate ObjectId
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

function chatSocketHandler(socket, io) {
  console.log("A user connected:", socket.id);

  // Register the user with socket
  socket.on("register", (userData) => {
    if (!userData?.userName) return;

    socket.userName = userData.userName;
    users[socket.userName] = socket;
    console.log("User registered:", Object.keys(users));
  });

  // Handle sending chat message
  socket.on("chat message", async (msg) => {
    const { Id, selectedUserId, message, userName } = msg || {};

    if (!Id || !selectedUserId || !message || !userName) {
      console.error("Invalid message data:", msg);
      return;
    }

    if (!isValidObjectId(Id) || !isValidObjectId(selectedUserId)) {
      console.error("Invalid ObjectId(s) in chat message:", {
        Id,
        selectedUserId,
      });
      return;
    }

    try {
      await messageModel.create({
        sender: Id,
        chat: selectedUserId,
        content: message,
      });

      console.log("Message saved to database:", message);

      const senderLatest = await getLastMessages(Id);
      const receiverLatest = await getLastMessages(selectedUserId);

      if (users[userName]) {
        io.to(users[userName].id).emit("latest message", receiverLatest);
        io.to(users[userName].id).emit("chat message", {
          message,
          userName: socket.userName,
        });
      } else {
        console.log("User not found:", userName);
      }

      io.to(socket.id).emit("latest message", senderLatest);
    } catch (error) {
      console.error("Error saving message to database:", error);
    }
  });

  // Handle fetching chat history between two users
  socket.on("chat history", async (userData) => {
    const { userId1, userId2 } = userData || {};

    if (
      !userId1 ||
      !userId2 ||
      !isValidObjectId(userId1) ||
      !isValidObjectId(userId2)
    ) {
      console.error("Invalid user data for chat history:", userData);
      socket.emit("chat history error", "Invalid user data.");
      return;
    }

    try {
      const messages = await getChatHistory(userId1, userId2);
      socket.emit("chat history", messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      socket.emit("chat history error", "Failed to fetch chat history.");
    }
  });

  // Handle fetching latest messages for a user
  socket.on("latest message", async (userData) => {
    const userId = userData?.userId;

    if (!userId || !isValidObjectId(userId)) {
      console.error("Invalid userId for latest message:", userData);
      socket.emit("latest message error", "Invalid user data.");
      return;
    }

    try {
      const latestMessages = await getLastMessages(userId);
      socket.emit("latest message", latestMessages);
    } catch (error) {
      console.error("Error fetching latest message:", error);
      socket.emit("latest message error", "Failed to fetch latest message.");
    }
  });

  // Handle typing event
  socket.on("typing", (data) => {
    if (!data?.userName) {
      console.error("Invalid typing data:", data);
      return;
    }

    if (users[data.userName]) {
      io.to(users[data.userName].id).emit("user typing", {
        typing: true,
        from: data.userId,
      });
    } else {
      console.log("User not found for typing event:", data.userName);
    }
  });

  socket.on("stop typing", (data) => {
    if (!data?.userName) {
      console.error("Invalid stop typing data:", data);
      return;
    }

    if (users[data.userName]) {
      io.to(users[data.userName].id).emit("user stop typing", {
        typing: false,
        from: data.userId,
      });
    } else {
      console.log("User not found for stop typing event:", data.userName);
    }
  });

  socket.on("isOnline", (userName) => {
    if (users[userName]) {
      socket.emit("isOnline", true);
    } else {
      socket.emit("isOnline", false);
    }
  });

  socket.on("joinGroup", async (data) => {
    const { groupData, newRoomId } = data || {};
    if (!groupData || !newRoomId) {
      console.error("Invalid group data:", data);
      return;
    }
    try {
      const { name, users, admin, isGroupChat, file, description } = groupData;

      let groupImage = null;
      if (file) {
        const base64Data = file.includes(",") ? file.split(",")[1] : file;
        const buffer = Buffer.from(base64Data, "base64");

        const filePath = `uploads/group-${Date.now()}.png`;
        fs.writeFileSync(filePath, buffer);

        groupImage = filePath;
      }
      await chatModel.create({
        name,
        users,
        isGroupChat,
        groupImage,
        description,
        admin,
        roomId: data.newRoomId,
      });
      socket.join(newRoomId);
    } catch (error) {
      console.log("Error creating group:", error);
    }
  });

  socket.on("join-room", (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`User ${socket.userName} joined room ${roomId}`);
  });

  socket.on("getGroup", async (data) => {
    const { userId } = data || {};
    if (!userId) {
      console.error("Invalid groupId:", data);
      return;
    }
    try {
      const groups = await chatModel
        .find({ users: userId })
        .populate("users", "-password");
      socket.emit("getGroup", groups);
    } catch (error) {
      console.log("Error fetching group:", error);
    }
  });

  // Handle sending group chat message

  socket.on("group-chat", async (data) => {
    const { groupId, message, senderId } = data || {};
    console.log(data);
    if (!groupId || !message) {
      console.error("Invalid group data:", data);
      return;
    }
    try {
      const user = await userModel.findOne({ _id: senderId });

      io.in(groupId).emit("group-chat", {
        text: message,
        userName: socket.userName,
        senderId,
        groupId,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderName: user?.name,
        senderPic: user?.profileImg || "https://i.pravatar.cc/150?img=3",
      });

      await groupChatModel.create({
        text: message,
        senderId,
        groupId,
        senderName: user?.name,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      console.log("Error sending group message:", error);
    }
  });
  // Handle fetching group chat history
  socket.on("group-chat-history", async (data) => {
    const { groupId } = data || {};
    if (!groupId) {
      console.error("Invalid groupId:", data);
      return;
    }
    try {
      const messages = await groupChatModel
        .find({ groupId })
        .populate("senderId", "-password");
      socket.emit("group-chat-history", messages);
    } catch (error) {
      console.log("Error fetching group chat history:", error);
    }
  });

  socket.on("getLastChat", async () => {
    console.log("Fetching last chats for all groups");
    try {
      const lastChats = await getLastChatsForAllGroups();
      socket.emit("getLastChat", lastChats); // Emit array of last messages per group
    } catch (error) {
      console.log("Error fetching last chats:", error);
      socket.emit("getLastChat", []); // Optional: emit empty if error
    }
  });
 

  // Handle user disconnecta
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (socket.userName && users[socket.userName]) {
      delete users[socket.userName];
      console.log("User removed from users list:", socket.userName);
    }
  });
}

module.exports = chatSocketHandler;
