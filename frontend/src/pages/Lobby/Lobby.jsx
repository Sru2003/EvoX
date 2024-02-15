import React,{useState,useCallback} from "react";

const Lobby = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log({username});
},[]);
    return (  
        <div>
           <form onSubmit={handleSubmit}>
           <label htmlFor="username">Username</label>
              <input
                 type="text"
                 name="username"
                 id="username"
                 value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                 placeholder="Enter username"
                 required/>
                    <br/>
                 <label htmlFor="room">Room</label>
                 <input type="text" name="room" id="room" value={room}
                 onChange={(e)=>setRoom(e.target.value)} placeholder="Enter room"/> 
                 <br/>
                 <button type="submit" className="btn">Join Chat</button>
                 </form>
        </div>  
    );
};

export default Lobby;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Lobby = () => {
//     const [meetingCode, setMeetingCode] = useState('');
//     const [username, setUsername] = useState('');
//     const [isMeetingCodeEntered, setIsMeetingCodeEntered] = useState(false);
//     const navigate = useNavigate();

//     const handleMeetingCodeChange = (event) => {
//         setMeetingCode(event.target.value);
//         setIsMeetingCodeEntered(event.target.value.trim() !== '');
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handleJoinMeeting = () => {
//         navigate(`/room?meetingID=${meetingCode}&username=${username}`);
//         console.log('Joining meeting with code:', meetingCode, 'and username:', username);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <ul className="space-y-4">
//                 <li>
//                     <button className="special-btn">New Meeting</button>
//                 </li>
//                 <li>
//                     <input 
//                         type="text" 
//                         placeholder="Enter meeting code"
//                         value={meetingCode}
//                         onChange={handleMeetingCodeChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                 </li>
//                 <li>
//                     <input 
//                         type="text" 
//                         placeholder="Enter username"
//                         value={username}
//                         onChange={handleUsernameChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                 </li>
//                 <li>
//                     <button 
//                         className={`special-btn ${isMeetingCodeEntered ? '' : 'opacity-50 cursor-not-allowed'}`}
//                         onClick={handleJoinMeeting}
//                         disabled={!isMeetingCodeEntered}
//                     >
//                         Join Meeting
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Lobby;

// import React from 'react';
// import './lobby.css'; // Import your CSS file
// import { useNavigate } from 'react-router-dom';
// function Lobby() {
//   const navigate = useNavigate(); // Get the navigation function

//   function handleSubmit(event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     // Handle form submission, for example, navigate to chat page
//     navigate('/room');

//     const formData = new FormData(event.target);
//     const formDataObject = {};
//     formData.forEach((value, key) => {
//       formDataObject[key] = value;
//     });
//     console.log('Form Data:', formDataObject);
//   }

//   return (
//     <div className="join-container">
//       <header className="join-header">
//         <h1><i className="fas fa-video"></i> ZoomCord</h1>
//       </header>
//       <main className="join-main">
//         <form onSubmit={handleSubmit}>
//           <div className="form-control">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               placeholder="Enter username..."
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label htmlFor="room">Room</label>
//             <select name="room" id="room">
//               <option value="Malaysia">Malaysia</option>
//               <option value="Indonesia">Indonesia</option>
//               <option value="Singapore">Singapore</option>
//             </select>
//           </div>
//           <button type="submit" className="btn">Join Chat</button>
//         </form>
//       </main>
//     </div>
//   );
// }

// export default Lobby;
