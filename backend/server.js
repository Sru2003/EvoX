const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const http = require('http');
const { Server }=require('socket.io') ;
const cors = require('cors');
const { roomHandler } = require('./room/index')

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

// io.on('connection',(socket)=>{
//     console.log('a user connected')

//     roomHandler(socket);
    
//     socket.on('disconnect',()=>{
//         console.log('user is disconnected');
    
//     })
// })

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/home', require('./routes/home'))
app.use('/api/users', require('./routes/userRoutes'))
//app.listen(port, () => console.log(`Server started on port ${port}`))
