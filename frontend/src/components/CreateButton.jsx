import React, { useContext } from 'react';
import {RoomContext, RoomProvider } from '../context/RoomContext';

export const 
Join = () => {
    const { ws } = useContext(RoomContext);
    const joinRoom = () => {
        ws.emit('create-room');
    };
    return (
        <div className='video'>
            <button onClick={joinRoom} className="bg-yellow-200 py-2 px-8 rounded-lg hover:bg-yellow-400">Start New Meeting</button>
          </div>
    );
};