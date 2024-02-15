import React, { useState, useEffect } from 'react';
import './lobby.css'; // Import your CSS file
import Peer from 'peerjs';
import io from 'socket.io-client';
import Qs from 'qs';
import VideoComponent from './VideoComponent'; // Import VideoComponent

function ChatApp() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(null);
  const [users, setUsers] = useState([]);
  const [peer, setPeer] = useState(null);
  const [peers, setPeers] = useState({});
  const [myVideoStream, setMyVideoStream] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const { username, room } = Qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });
    setUsername(username);
    setRoom(room);
 
   
    const myPeer = new Peer(undefined, {
      host: 'localhost',
      port: '5000'
    });

    const newSocket = io();
    setSocket(newSocket);

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      setMyVideoStream(stream);

      // Replace addVideoStream with VideoComponent
      return <VideoComponent stream={stream} name="Local" isLocal />;

      myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          // Replace addVideoStream with VideoComponent
          return <VideoComponent stream={userVideoStream} name={call.name || 'Remote'} />;
        });
      });

      newSocket.on('user-connected', userId => {
        setTimeout(() => connectToNewUser(userId, stream), 1000);
      });
    },);

    myPeer.on('open', userPeerId => {
      newSocket.emit('joinRoom', { userPeerId, username, room });
    });

    newSocket.on('roomUsers', ({ users }) => {
      setUsers(users);
    });

    newSocket.on('user-disconnected', userId => {
      if (peers[userId]) {
        peers[userId].close();
      }
    });

    setPeer(myPeer);
    setPeers({});
    
    return () => {
      newSocket.disconnect();
      myPeer.destroy();
    };
  }, []);

  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      // Replace addVideoStream with VideoComponent
      return <VideoComponent stream={userVideoStream} name={call.name || 'Remote'} />;
    });
    call.on('close', () => {
      video.remove();
    });

    setPeers(prevPeers => ({
      ...prevPeers,
      [userId]: call
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket) sendMessage(); // Ensure socket is initialized before sending message
  };

  const sendMessage = () => {
    socket.emit('chatMessage', message);
    socket.emit('stop typing');
    setTyping(false);
    setMessage('');
  };

  const handleInputChange = (event) => {
    const msg = event.target.value;
    setMessage(msg);
    updateTyping();
  };

  const updateTyping = () => {
    if (!typing) {
      setTyping(true);
      socket.emit('typing');
    }
    setLastTypingTime(new Date().getTime());

    setTimeout(() => {
      const typingTimer = new Date().getTime();
      const timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= 400 && typing) {
        socket.emit('stop typing');
        setTyping(false);
      }
    }, 400);
  };

  useEffect(() => {
    if (!socket) return; // Check if socket is initialized
  
    socket.on('typing', data => {
      addChatTyping(data);
    });
    socket.on('stop typing', data => {
      removeChatTyping(data);
    });
  
    return () => {
      socket.disconnect();
    };
  }, [socket]); // Include socket in the dependencies array
  
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = ' is typing..';
    addTypingMessage(data);
  };

  const removeChatTyping = (data) => {
    const typingElement = document.getElementsByClassName('typing');
    while (typingElement.length > 0) {
      typingElement[0].remove();
    }
  };

  const addTypingMessage = (data) => {
    const typingClass = data.typing ? 'typing' : '';
    const div = document.createElement('div');
    div.classList.add(typingClass);

    const p = document.createElement('p');
    p.innerText = data.username + data.message;

    div.appendChild(p);

    const isTypingDiv = document.getElementById('is-typing');
    isTypingDiv.appendChild(div);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-video"></i> EvoX</h1>
        <a href="index.html" className="special-btn">Leave Room</a>
      </header>
      <div id="video-grid"></div>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Meeting ID:</h3>
          <h2 id="room-name">{room}</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
            {/* Map through users and display their usernames */}
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
            {/* Display current user's username */}
            <li>{username}</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="is-typing" id="is-typing"></div>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={message}
            onChange={handleInputChange}
          />
          <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatApp;

// import React, { useState, useEffect } from 'react';
// import './lobby.css'; // Import your CSS file
// import Peer from 'peerjs';
// import io from 'socket.io-client';
// import Qs from 'qs';
// import VideoComponent from './VideoComponent'; // Import VideoComponent

// function ChatApp() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');
//   const [message, setMessage] = useState('');
//   const [typing, setTyping] = useState(false);
//   const [lastTypingTime, setLastTypingTime] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [peer, setPeer] = useState(null);
//   const [peers, setPeers] = useState({});
//   const [myVideoStream, setMyVideoStream] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const { username, room } = Qs.parse(window.location.search, {
//       ignoreQueryPrefix: true
//     });
//     setUsername(username);
//     setRoom(room);
 
   
//     const myPeer = new Peer(undefined, {
//       host: 'localhost',
//       port: '5000'
//     });

//     const newSocket = io();
//     setSocket(newSocket);

//     navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       setMyVideoStream(stream);

//       // Replace addVideoStream with VideoComponent
//       return <VideoComponent stream={stream} name="Local" isLocal />;

//       myPeer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video');
//         call.on('stream', userVideoStream => {
//           // Replace addVideoStream with VideoComponent
//           return <VideoComponent stream={userVideoStream} name={call.name || 'Remote'} />;
//         });
//       });

//       newSocket.on('user-connected', userId => {
//         setTimeout(() => connectToNewUser(userId, stream), 1000);
//       });
//     },);

//     myPeer.on('open', userPeerId => {
//       newSocket.emit('joinRoom', { userPeerId, username, room });
//     });

//     newSocket.on('roomUsers', ({ users }) => {
//       setUsers(users);
//     });

//     newSocket.on('user-disconnected', userId => {
//       if (peers[userId]) {
//         peers[userId].close();
//       }
//     });

//     setPeer(myPeer);
//     setPeers({});
    
//     return () => {
//       newSocket.disconnect();
//       myPeer.destroy();
//     };
//   }, []);

//   const connectToNewUser = (userId, stream) => {
//     const call = peer.call(userId, stream);
//     const video = document.createElement('video');
//     call.on('stream', userVideoStream => {
//       // Replace addVideoStream with VideoComponent
//       return <VideoComponent stream={userVideoStream} name={call.name || 'Remote'} />;
//     });
//     call.on('close', () => {
//       video.remove();
//     });

//     setPeers(prevPeers => ({
//       ...prevPeers,
//       [userId]: call
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (socket) sendMessage(); // Ensure socket is initialized before sending message
//   };

//   const sendMessage = () => {
//     socket.emit('chatMessage', message);
//     socket.emit('stop typing');
//     setTyping(false);
//     setMessage('');
//   };

//   const handleInputChange = (event) => {
//     const msg = event.target.value;
//     setMessage(msg);
//     updateTyping();
//   };

//   const updateTyping = () => {
//     if (!typing) {
//       setTyping(true);
//       socket.emit('typing');
//     }
//     setLastTypingTime(new Date().getTime());

//     setTimeout(() => {
//       const typingTimer = new Date().getTime();
//       const timeDiff = typingTimer - lastTypingTime;
//       if (timeDiff >= 400 && typing) {
//         socket.emit('stop typing');
//         setTyping(false);
//       }
//     }, 400);
//   };

//   useEffect(() => {
//     if (!socket) return; // Check if socket is initialized
  
//     socket.on('typing', data => {
//       addChatTyping(data);
//     });
//     socket.on('stop typing', data => {
//       removeChatTyping(data);
//     });
  
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]); // Include socket in the dependencies array
  
//   const addChatTyping = (data) => {
//     data.typing = true;
//     data.message = ' is typing..';
//     addTypingMessage(data);
//   };

//   const removeChatTyping = (data) => {
//     const typingElement = document.getElementsByClassName('typing');
//     while (typingElement.length > 0) {
//       typingElement[0].remove();
//     }
//   };

//   const addTypingMessage = (data) => {
//     const typingClass = data.typing ? 'typing' : '';
//     const div = document.createElement('div');
//     div.classList.add(typingClass);

//     const p = document.createElement('p');
//     p.innerText = data.username + data.message;

//     div.appendChild(p);

//     const isTypingDiv = document.getElementById('is-typing');
//     isTypingDiv.appendChild(div);
//   };

//   return (
//     <div className="chat-container">
//       <header className="chat-header">
//         <h1><i className="fas fa-video"></i> ZoomCord</h1>
//         <a href="index.html" className="btn">Leave Room</a>
//       </header>
//       <div id="video-grid"></div>
//       <main className="chat-main">
//         <div className="chat-sidebar">
//           <h3><i className="fas fa-comments"></i> Room Name:</h3>
//           <h2 id="room-name">{room}</h2>
//           <h3><i className="fas fa-users"></i> Users</h3>
//           <ul id="users">
//             {users.map((user, index) => (
//               <li key={index}>{user.username}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="chat-messages">
//           <div className="is-typing" id="is-typing"></div>
//         </div>
//       </main>
//       <div className="chat-form-container">
//         <form id="chat-form" onSubmit={handleSubmit}>
//           <input
//             id="msg"
//             type="text"
//             placeholder="Enter Message"
//             required
//             autoComplete="off"
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;

// import React, { useState, useEffect } from 'react';
// import './lobby.css'; // Import your CSS file
// import Peer from 'peerjs';
// import io from 'socket.io-client';
// import Qs from 'qs';

// function ChatApp() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');
//   const [message, setMessage] = useState('');
//   const [typing, setTyping] = useState(false);
//   const [lastTypingTime, setLastTypingTime] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [peer, setPeer] = useState(null);
//   const [peers, setPeers] = useState({});
//   const [myVideoStream, setMyVideoStream] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const { username, room } = Qs.parse(window.location.search, {
//       ignoreQueryPrefix: true
//     });
//     setUsername(username);
//     setRoom(room);
 
   
//     const myPeer = new Peer(undefined, {
//       host: 'localhost',
//       port: '5000'
//     });

//     const newSocket = io();
//     setSocket(newSocket);

//     navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       setMyVideoStream(stream);

//       addVideoStream(myPeer, stream);

//       myPeer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video');
//         call.on('stream', userVideoStream => {
//           addVideoStream(video, userVideoStream);
//         });
//       });

//       newSocket.on('user-connected', userId => {
//         setTimeout(() => connectToNewUser(userId, stream), 1000);
//       });
//     },);

//     myPeer.on('open', userPeerId => {
//       newSocket.emit('joinRoom', { userPeerId, username, room });
//     });

//     newSocket.on('roomUsers', ({ users }) => {
//       setUsers(users);
//     });

//     newSocket.on('user-disconnected', userId => {
//       if (peers[userId]) {
//         peers[userId].close();
//       }
//     });

//     setPeer(myPeer);
//     setPeers({});
    
//     return () => {
//       newSocket.disconnect();
//       myPeer.destroy();
//     };
//   }, []);

//   const connectToNewUser = (userId, stream) => {
//     const call = peer.call(userId, stream);
//     const video = document.createElement('video');
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream);
//     });
//     call.on('close', () => {
//       video.remove();
//     });

//     setPeers(prevPeers => ({
//       ...prevPeers,
//       [userId]: call
//     }));
//   };

//   const addVideoStream = (video, stream) => {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//       video.play();
//     });
//     const videoGrid = document.getElementById('video-grid');
//     videoGrid.append(video);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (socket) sendMessage(); // Ensure socket is initialized before sending message
//   };

//   const sendMessage = () => {
//     socket.emit('chatMessage', message);
//     socket.emit('stop typing');
//     setTyping(false);
//     setMessage('');
//   };

//   const handleInputChange = (event) => {
//     const msg = event.target.value;
//     setMessage(msg);
//     updateTyping();
//   };

//   const updateTyping = () => {
//     if (!typing) {
//       setTyping(true);
//       socket.emit('typing');
//     }
//     setLastTypingTime(new Date().getTime());

//     setTimeout(() => {
//       const typingTimer = new Date().getTime();
//       const timeDiff = typingTimer - lastTypingTime;
//       if (timeDiff >= 400 && typing) {
//         socket.emit('stop typing');
//         setTyping(false);
//       }
//     }, 400);
//   };

//   useEffect(() => {
//     if (!socket) return; // Check if socket is initialized
  
//     socket.on('typing', data => {
//       addChatTyping(data);
//     });
//     socket.on('stop typing', data => {
//       removeChatTyping(data);
//     });
  
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]); // Include socket in the dependencies array
  
//   const addChatTyping = (data) => {
//     data.typing = true;
//     data.message = ' is typing..';
//     addTypingMessage(data);
//   };

//   const removeChatTyping = (data) => {
//     const typingElement = document.getElementsByClassName('typing');
//     while (typingElement.length > 0) {
//       typingElement[0].remove();
//     }
//   };

//   const addTypingMessage = (data) => {
//     const typingClass = data.typing ? 'typing' : '';
//     const div = document.createElement('div');
//     div.classList.add(typingClass);

//     const p = document.createElement('p');
//     p.innerText = data.username + data.message;

//     div.appendChild(p);

//     const isTypingDiv = document.getElementById('is-typing');
//     isTypingDiv.appendChild(div);
//   };

//   return (
//     <div className="chat-container">
//       <header className="chat-header">
//         <h1><i className="fas fa-video"></i> ZoomCord</h1>
//         <a href="index.html" className="btn">Leave Room</a>
//       </header>
//       <div id="video-grid"></div>
//       <main className="chat-main">
//         <div className="chat-sidebar">
//           <h3><i className="fas fa-comments"></i> Room Name:</h3>
//           <h2 id="room-name">{room}</h2>
//           <h3><i className="fas fa-users"></i> Users</h3>
//           <ul id="users">
//             {users.map((user, index) => (
//               <li key={index}>{user.username}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="chat-messages">
//           <div className="is-typing" id="is-typing"></div>
//         </div>
//       </main>
//       <div className="chat-form-container">
//         <form id="chat-form" onSubmit={handleSubmit}>
//           <input
//             id="msg"
//             type="text"
//             placeholder="Enter Message"
//             required
//             autoComplete="off"
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
// import React, { useState, useEffect, useReducer } from 'react';
// import './lobby.css'; // Import your CSS file
// import Peer from 'peerjs';
// import io from 'socket.io-client';
// import Qs from 'qs';
// import { peersReducer, addPeerAction, removePeerAction } from '../../context/peerReducer';

// function ChatApp() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');
//   const [message, setMessage] = useState('');
//   const [typing, setTyping] = useState(false);
//   const [lastTypingTime, setLastTypingTime] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [peer, setPeer] = useState(null);
//   const [peersState, dispatch] = useReducer(peersReducer, {});
//   const [myVideoStream, setMyVideoStream] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const { username, room } = Qs.parse(window.location.search, {
//       ignoreQueryPrefix: true
//     });
//     setUsername(username);
//     setRoom(room);

//     const myPeer = new Peer(undefined, {
//       host: 'localhost',
//       port: '5000'
//     });

//     const newSocket = io();
//     setSocket(newSocket);

//     navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       setMyVideoStream(stream);

//       addVideoStream(myPeer, stream);

//       myPeer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video');
//         call.on('stream', userVideoStream => {
//           addVideoStream(video, userVideoStream);
//         });
//       });

//       newSocket.on('user-connected', userId => {
//         setTimeout(() => connectToNewUser(userId, stream), 1000);
//       });
//     });

//     myPeer.on('open', userPeerId => {
//       newSocket.emit('joinRoom', { userPeerId, username, room });
//     });

//     newSocket.on('roomUsers', ({ users }) => {
//       setUsers(users);
//     });

//     newSocket.on('user-disconnected', userId => {
//       if (peersState[userId]) {
//         peersState[userId].close();
//         dispatch(removePeerAction(userId));
//       }
//     });

//     setPeer(myPeer);
    
//     return () => {
//       newSocket.disconnect();
//       myPeer.destroy();
//     };
//   }, []);

//   const connectToNewUser = (userId, stream) => {
//     const call = peer.call(userId, stream);
//     const video = document.createElement('video');
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream);
//     });
//     call.on('close', () => {
//       video.remove();
//       dispatch(removePeerAction(userId));
//     });

//     dispatch(addPeerAction(userId, call));
//   };

//   const addVideoStream = (video, stream) => {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//       video.play();
//     });
//     const videoGrid = document.getElementById('video-grid');
//     videoGrid.append(video);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     sendMessage();
//   };

//   const sendMessage = () => {
//     socket.emit('chatMessage', message);
//     socket.emit('stop typing');
//     setTyping(false);
//     setMessage('');
//   };

//   const handleInputChange = (event) => {
//     const msg = event.target.value;
//     setMessage(msg);
//     updateTyping();
//   };

//   const updateTyping = () => {
//     if (!typing) {
//       setTyping(true);
//       socket.emit('typing');
//     }
//     setLastTypingTime(new Date().getTime());

//     setTimeout(() => {
//       const typingTimer = new Date().getTime();
//       const timeDiff = typingTimer - lastTypingTime;
//       if (timeDiff >= 400 && typing) {
//         socket.emit('stop typing');
//         setTyping(false);
//       }
//     }, 400);
//   };

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('typing', data => {
//       addChatTyping(data);
//     });
//     socket.on('stop typing', data => {
//       removeChatTyping(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const addChatTyping = (data) => {
//     data.typing = true;
//     data.message = ' is typing..';
//     addTypingMessage(data);
//   };

//   const removeChatTyping = (data) => {
//     const typingElement = document.getElementsByClassName('typing');
//     while (typingElement.length > 0) {
//       typingElement[0].remove();
//     }
//   };

//   const addTypingMessage = (data) => {
//     const typingClass = data.typing ? 'typing' : '';
//     const div = document.createElement('div');
//     div.classList.add(typingClass);

//     const p = document.createElement('p');
//     p.innerText = data.username + data.message;

//     div.appendChild(p);

//     const isTypingDiv = document.getElementById('is-typing');
//     isTypingDiv.appendChild(div);
//   };

//   return (
//     <div className="chat-container">
//       <header className="chat-header">
//         <h1><i className="fas fa-video"></i> ZoomCord</h1>
//         <a href="index.html" className="btn">Leave Room</a>
//       </header>
//       <div id="video-grid"></div>
//       <main className="chat-main">
//         <div className="chat-sidebar">
//           <h3><i className="fas fa-comments"></i> Room Name:</h3>
//           <h2 id="room-name">{room}</h2>
//           <h3><i className="fas fa-users"></i> Users</h3>
//           <ul id="users">
//             {users.map((user, index) => (
//               <li key={index}>{user.username}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="chat-messages">
//           <div className="is-typing" id="is-typing"></div>
//         </div>
//       </main>
//       <div className="chat-form-container">
//         <form id="chat-form" onSubmit={handleSubmit}>
//           <input
//             id="msg"
//             type="text"
//             placeholder="Enter Message"
//             required
//             autoComplete="off"
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
