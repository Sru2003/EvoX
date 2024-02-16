// import React, { createContext, useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// import {v4} from 'uuid';

// const SocketContext = createContext();

// const socket = io('http://localhost:5000');

// const ContextProvider = ({ children }) => {
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [stream, setStream] = useState();
//   const [name, setName] = useState('');
//   const [call, setCall] = useState({});
//   const [me, setMe] = useState('');
//   const [users, setUsers] = useState({});
// const [groupCall, setGroupCall] = useState(false);


//   const myVideo = useRef({ current: null });
//   const userVideo = useRef({ current: null });
//   const connectionRef = useRef();

//   useEffect(() => {
//     socket.on('updateUsers', (users) => setUsers(users));
//   }, []);
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);

//         myVideo.current.srcObject = currentStream;
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   // const callUser = (id) => {
//   //   const peer = new Peer({ initiator: true, trickle: false, stream });

//   //   peer.on('signal', (data) => {
//   //     socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//   //   });

//   //   peer.on('stream', (currentStream) => {
//   //     userVideo.current.srcObject = currentStream;
//   //   });

//   //   socket.on('callAccepted', (signal) => {
//   //     setCallAccepted(true);

//   //     peer.signal(signal);
//   //   });

//   //   connectionRef.current = peer;
//   // };
//   const callUser = (id) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });
  
//     peer.on('signal', (data) => {
//       socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//     });
  
//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });
  
//     socket.on('callAccepted', (signal) => {
//       setCallAccepted(true);
  
//       peer.signal(signal);
//     });
  
//     connectionRef.current = peer;
//   };

//   const joinGroupCall = () => {
//     setGroupCall(true);
//     socket.emit('joinGroupCall');
//   };
  
//   const leaveCall = () => {
//     setCallEnded(true);

//     connectionRef.current.destroy();

//     window.location.reload();
//   };

//   return (
//     <SocketContext.Provider value={{
//       call,
//       callAccepted,
//       myVideo,
//       userVideo,
//       stream,
//       name,
//       setName,
//       callEnded,
//       me,
//       users,
//       callUser,
//       leaveCall,
//       answerCall,
//       groupCall,
//       joinGroupCall,
//     }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { ContextProvider, SocketContext };

