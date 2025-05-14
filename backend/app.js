const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectMongoDb } = require('./config/connection');
const dotenv = require('dotenv');
const userRouter = require('./routes/auth/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const chatSocketHandler = require('./sockets/chatSocket');
const dashboardRouter = require('./routes/private/index');
const path = require('path');
dotenv.config();

connectMongoDb(process.env.MONGODB);
const app = express();
const server = createServer(app);
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const  corsOptions={
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

app.use(cors(corsOptions));

app.use(express.json());
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// Test route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

// Socket.io connection
io.on('connection', (socket) => {
  socket.on('login', (data) => {
    console.log('User logged in:', data.email);
  });
  chatSocketHandler(socket,io)
});

app.use('/api/auth',userRouter );

app.use('/dashboard',dashboardRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start the server
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
