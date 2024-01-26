import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/Context';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  const handleCopyClick = (e) => {
    e.preventDefault();
    console.log(me);
    navigator.clipboard.writeText(me);
  };

  const handleCallClick = (e) => {
    e.preventDefault();
    callUser(idToCall);
  };

  return (
    <>
      <form className="flex flex-col items-center p-4">
        <div className="mb-4">
          <label className="mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <CopyToClipboard text={me} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
            <button  onClick={handleCopyClick} className='special-btn'>
              Copy Your ID
            </button>
          </CopyToClipboard>
        </div>

        <div>
          <label className="mb-2">ID to call</label>
          <input
            type="text"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          {callAccepted && !callEnded ? (
            <button
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
              onClick={leaveCall}
            >
              Hang Up
            </button>
          ) : (
            <button
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleCallClick}
            >
              Call
            </button>
          )}
        </div>
      </form>
      {children}
    </>
  );
};

export default Sidebar;
