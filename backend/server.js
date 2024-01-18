const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const http = require('http');
const { Server }=require('socket.io') ;
const cors = require('cors');
const { roomHandler } = require('./room/roomHandler')

connectDB()

const app = express()
const server = http.createServer(app)
const io = new Server(server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
 server.listen(port, () => console.log(`Server running on port ${port}`))

io.on('connection',(socket)=>{
    console.log('user is connected')
   roomHandler(socket);
    socket.on('disconnect',()=>{
        console.log('user is disconnected');
    
    })
})
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/home', require('./routes/home'))
app.use('/api/users', require('./routes/userRoutes'))
//app.listen(port, () => console.log(`Server started on port ${port}`))