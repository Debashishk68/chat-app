const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
      content: { type: String, required: true },
      attachment: { type: String, default: "" }, // URL of an image, video, or file
      seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Users who have seen the message
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Message", MessageSchema);
  