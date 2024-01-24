import React, { useContext } from 'react';
import {RoomContext, RoomProvider } from '../context/RoomContext';

export const Join = () => {
    const { ws } = useContext(RoomContext);
    const createRoom = () => {
        ws.emit('create-room');
    };
    return (
        <div className='ml-4 mr-4 special-btn'>
            <button onClick={createRoom} >Start New Meeting</button>
          </div>
    );
};