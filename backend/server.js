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

  connectedUsers[user] = socket.id

  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded', socket.id);
    delete users[socket.id];
    io.emit('updateUsers', users);
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('joinGroupCall', () => {
    users[socket.id] = socket.id;
    io.emit('updateUsers', users);
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return next();
})
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use('/api/home', require('./routes/home'))
//app.use('/api/users', require('./routes/userRoutes'))
app.use(router);
//app.listen(port, () => console.log(`Server started on port ${port}`))
server.listen(port, () => console.log(`Server running on port ${port}`))
