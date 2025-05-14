const chatModel = require("../models/chatModel");

const getGroups = async (req, res) => {
  const { userId } = req.body;
  
  try {
    const groups = await chatModel.find({ users: userId }).populate('users'); // optionally populate fields you want

    if (!groups || groups.length === 0) {
      return res.status(200).send("No Groups Found");
    }
    
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getGroups };
