const express = require('express');
const { login, register, logout } = require('../../controllers/authController');
const multer = require('multer');
const router = express.Router();
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

router.post('/login', login);
router.post('/register', upload.single('file'), register)
router.post('/logout', logout)

module.exports=router;