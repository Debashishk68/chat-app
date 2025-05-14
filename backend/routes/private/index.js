const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../middlewares/isLoggedIn');
const User = require('../../models/userModel'); // Using PascalCase for models
const { getGroups } = require('../../controllers/groupController');


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

router.post('/grouppic', upload.single('file'), (req, res) => {
    if (req.file) {
      res.status(200).json({ message: 'File uploaded successfully!' });
    } else {
      res.status(400).json({ message: 'No file uploaded!' });
    }
  });

router.get('/groups',isLoggedIn,getGroups);

module.exports = router;
