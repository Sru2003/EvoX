import React, { useContext } from 'react';
import {RoomContext, RoomProvider } from '../context/RoomContext';
import {SocketContext} from '../context/Context';
import { useNavigate } from 'react-router-dom';
export const Join = () => {
    // const { ws } = useContext(RoomContext);
    // const createRoom = () => {
    //     ws.emit('create-room');
    // };
    const navigate = useNavigate();

    const goToRoom = () => {
        navigate('/room');    
    }
    return (
        <div className='ml-4 mr-4 special-btn'>
            {/* <button onClick={createRoom} >Start New Meeting</button> */}
            <button onClick={goToRoom} >Start New Meeting</button>

          </div>
    );
};