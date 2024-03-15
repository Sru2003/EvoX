// import React, { useContext, useEffect } from 'react';
// import { SocketContext } from '../context/Context';

// const VideoPlayer = () => {
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, } = useContext(SocketContext);

//   useEffect(() => {
//     if (myVideo.current && stream) {
//       myVideo.current.srcObject = stream;
//     }
//   }, [stream]);

//   const videoStyles = {
//     width: '200px', // Decreased width
//     height: '150px', // Decreased height
//     borderRadius: '10px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
//     marginBottom: '10px',
//   };

//   return (
//     <div className="flex justify-center items-center h-full ">
//       {stream && (
//         <div className="text-white text-center m-4">
//           <h3>{name || 'Name'}</h3>
//           <video playsInline muted ref={myVideo} autoPlay style={videoStyles} className="border-white border-2" />
//         </div>
//       )}
//       {callAccepted && !callEnded && (
//         <div className="text-white text-center m-4">
//           <h3>{call.name || 'Name'}</h3>
//           <video playsInline ref={userVideo} autoPlay style={videoStyles} className="border-white border-2" />
//         </div>
//       )}
     
//     </div>
//   );
// };

// export default VideoPlayer;
