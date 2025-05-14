const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../middlewares/isLoggedIn');
const User = require('../../models/userModel'); 


const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

router.post('/', isLoggedIn, (req, res) => {
    try {
        const { userName,user } = req.id;
        return res.status(200).json({ authenticated: true, userName,user });
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


router.get('/users', isLoggedIn, async (req, res) => {
    const { user } = req.id; 
    console.log(user)
    try {
        const users = await User.find(
            { "_id": { $ne: user } },  // Exclude the logged-in user's ID
            { "_id": 1, "name": 1, "profileImg": 1 }
          );
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
});



module.exports = router;
