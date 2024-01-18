const { socket } = require('socket.io');
const { v4 } = require('uuid');

const rooms = {};

const IRoomParams = {
  roomId: undefined,
  peerId: undefined
};

const roomHandler = (socket) => {
  const createRoom = () => {
    const roomId = v4();
    rooms[roomId] = [];
    socket.emit('room-created', { roomId });
    console.log('user created room');
  };

  const joinRoom = ({ roomId, peerId }) => {
    if (rooms[roomId]) {
      console.log('user joined room', roomId, peerId);
      if (!rooms[roomId].includes(peerId)) {
        rooms[roomId].push(peerId);
      }
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', { peerId });
      socket.emit('get-users', { roomId, participants: rooms[roomId] });

      socket.on('disconnect', () => {
        console.log('user disconnected');
        leaveRoom({ roomId, peerId });
      });
    }
  };

  const leaveRoom = ({ roomId, peerId }) => {
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    socket.to(roomId).emit('user-disconnected', peerId);
  };

  socket.on('create-room', createRoom);
  socket.on('join-room', joinRoom);
};

module.exports = { roomHandler };
