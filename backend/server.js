const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { roomHandler } = require("./room/index");
const router = require("./routes/userRoutes");
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
  // cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"]
  // },
  // transports: ['websocket']
});

const usersToSocketIdMap = new Map();
const socketIdToUsersMap = new Map();
const connectedUsers = [];

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;

  socket.on("room:join", (data) => {
    const { username, room } = data;
    usersToSocketIdMap.set(username, socket.id);
    socketIdToUsersMap.set(socket.id, username);
    io.to(room).emit("user:joined", { username, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on('user:call',({to,offer})=>{
    io.to(to).emit('incoming:call',{from:socket.id,offer})
  })

  socket.on('call:accepted',({to,ans})=>{
    io.to(to).emit('call:accepted',{from:socket.id,ans})

    socket.on('peer:nego:needed',({to,offer})=>{
      io.to(to).emit('peer:nego:needed',{from:socket.id,offer})
    })
  })

  socket.on('peer:nego:done',({to,ans})=>{
    io.to(to).emit('peer:nego:final',{from:socket.id,ans})
  })
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
server.listen(port, () => console.log(`Server running on port ${port}`));
