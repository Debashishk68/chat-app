const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
      content: { type: String, required: true },
      attachment: { type: String, default: "" }, 
      seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] ,
      isRead: { type: Boolean, default: false }, 
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Message", MessageSchema);
  