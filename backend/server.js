const express = require('express')
const bodyParser = require('body-parser');
const emailjs = require('emailjs-com');
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const http = require('http');
const { Server }=require('socket.io') ;
const cors = require('cors');
const { roomHandler } = require('./room/index')
const router = require('./routes/userRoutes')

connectDB()


const app = express()

const server = http.createServer(app)
const io = new Server(server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        transports: ['websocket']
    });

    
const users = {};
const connectedUsers = [];

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return next();
})
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router);
app.use("/api/getkey", (req, res) => res.status(200).json({ key: process.env.RAZORPAY_KEY_ID }));
server.listen(port, () => console.log(`Server running on port ${port}`))
