const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    name: { 
      type: String, 
      required: function () { return this.isGroupChat; }, 
      trim: true,
    },
    groupImage: { 
      type: String, 
      required: function () { return this.isGroupChat; }, 
      default: 'default-group-image-url.jpg',
    },
    description: { 
      type: String, 
      required: function () { return this.isGroupChat; },
      default: 'No description provided.',
    },
    users: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    latestMessage: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message" 
    },
    admin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }, 
    roomId: { 
      type: String, 
      unique: true, 
      sparse: true 
    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
