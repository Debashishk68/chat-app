const messageModel = require("../models/messageModel");
const mongoose = require("mongoose");
const getChatHistory = async (user1, user2) => {
  if (!user1 || !user2) {
    return [];
  }
  try {
    const messages = await messageModel
      .find({
        $or: [
          { sender: user1, chat: user2 },
          { sender: user2, chat: user1 },
        ],
      })
      .sort({ timestamp: 1 });

    return messages;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};
const getLastMessages = async (userId) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const latestMessages = await messageModel.aggregate([
      {
        $match: {
          $or: [
            { sender: userObjectId },
            { chat: userObjectId },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $addFields: {
          chatPartnerId: {
            $cond: {
              if: { $eq: ["$sender", userObjectId] },
              then: "$chat",
              else: "$sender",
            },
          },
        },
      },
      {
        $group: {
          _id: "$chatPartnerId",
          latestMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "chatPartner",
        },
      },
      {
        $unwind: "$chatPartner",
      },
      {
        $project: {
          _id: "$latestMessage._id",
          content: "$latestMessage.content",
          createdAt: "$latestMessage.createdAt",
          chatPartner: {
            _id: "$chatPartner._id",
            name: "$chatPartner.name",
            email: "$chatPartner.email",
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return latestMessages;
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    return [];
  }
};




module.exports = { getChatHistory,getLastMessages };
