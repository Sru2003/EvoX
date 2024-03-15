// import React, { useState, useContext } from 'react';
// import { SocketContext } from '../context/Context';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// const Sidebar = ({ children }) => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState('');

//   const handleCopyClick = (e) => {
//     e.preventDefault();
//     console.log(me);
//     navigator.clipboard.writeText(me);
//   };

//   const handleCallClick = (e) => {
//     e.preventDefault();
//     callUser(idToCall);
//   };

//   return (
//     <>
//       <form className="flex flex-col items-center  p-4  ">
//         <div className="mb-4">
//           <label className="ml-3 mr-3 mb-2 text-lg text-white">Your Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="ml-3 mr-3 p-2 border border-gray-300 rounded focus:outline-none"
//           />
//           <CopyToClipboard text={me}>
//             <button
//               onClick={handleCopyClick}
//               className="ml-3 mr-3 mt-2 special-btn text-white py-2 px-4 rounded focus:outline-none"
//             >
//               Copy Your ID
//             </button>
//           </CopyToClipboard>
//         </div>

//         <div>
//           <label className="ml-3 mr-3 mb-2 text-lg text-white">ID to call</label>
//           <input
//             type="text"
//             value={idToCall}
//             onChange={(e) => setIdToCall(e.target.value)}
//             className="ml-3 mr-3 p-2 border border-gray-300 rounded focus:outline-none"
//           />
//           {callAccepted && !callEnded ? (
//             <button
//               className="ml-3 mr-3 mt-2 bg-red-500 text-white py-2 px-4 rounded focus:outline-none"
//               onClick={leaveCall}
//             >
//               Hang Up
//             </button>
//           ) : (
//             <button
//               className="ml-3 mr-3  mt-2 special-btn text-white py-2 px-4 rounded focus:outline-none"
//               onClick={handleCallClick}
//             >
//               Call
//             </button>
//           )}
//         </div>
//       </form>
//       {children}
//     </>
//   );
// };

// export default Sidebar;
