// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../../context/SocketProvider";
// const Lobby = () => {
//    const [username, setUsername] = useState('');
//    const [room, setRoom] = useState('');


//    const socket = useSocket();
//    const navigate=useNavigate();

//    console.log(socket);
//    const handleSubmit = useCallback((e) => {
//       e.preventDefault();
//       socket.emit('room:join', { username, room });
//    }, [username, room, socket]);

//    const handleJoinRoom=useCallback((data)=>{
//       const {username,room}=data;
//       navigate(`/room/${room}`)
//    },[navigate])

//    useEffect(()=>{
//       socket.on('room:join',handleJoinRoom)
//       return()=>{
//          socket.off('room:join',handleJoinRoom)
//       }
//    },[socket,handleJoinRoom])
//    return (
//       <div>
//          <form onSubmit={handleSubmit}>
//             <label htmlFor="username">Username</label>
//             <input
//                type="text"
//                name="username"
//                id="username"
//                value={username}
//                onChange={(e) => setUsername(e.target.value)}
//                placeholder="Enter username"
//                required />
//             <br />
//             <label htmlFor="room">Room</label>
//             <input type="text" name="room" id="room" value={room}
//                onChange={(e) => setRoom(e.target.value)} placeholder="Enter room" />
//             <br />
//             <button type="submit" className="special-btn">Join Chat</button>
//          </form>
//       </div>
//    );
// };

// export default Lobby;