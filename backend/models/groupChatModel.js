const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    attachment: { type: String, default: "" },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("GroupChatMessage", groupChatSchema);
