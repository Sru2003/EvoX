import { createContext, useEffect, useState,useReducer } from 'react';
import { peersReducer } from './peerReducer';
import  {addPeerAction,removePeerAction}  from './peerActions';

import Peer from 'peerjs';
import {v4} from 'uuid';

import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { set } from 'mongoose';

const WS = 'http://localhost:5000';
export const RoomContext = createContext(null);

const ws = socketIOClient(WS);

export const RoomProvider=({ children })=>{
    const navigate = useNavigate();
    const[me,setMe]=useState();
    const [stream, setStream] = useState(); 
    const[peers,dispatch]=useReducer(peersReducer,{});
    
    const enterRoom = ({roomId}) => { 
        console.log({roomId});
        
        if ({roomId}) {
            navigate(`/room/${roomId}`);
        } else {
            console.error('roomId is undefined or null');
        }
    };
    const getUsers=({participants})=>{
        console.log({participants});
    };
    const removePeer=({peerId})=>{
        dispatch(removePeerAction(peerId));
    };
    useEffect(() => {
        const meId=v4();

        const peer = new Peer(meId);
        setMe(peer);

        try{
            navigator.mediaDevices.getUserMedia({video:true,audio:true})
            .then((stream)=>{setStream(stream);}
            )
            }catch(err){
            console.log(err);
        }
        ws.on('room-created', enterRoom);
        ws.on('get-users',getUsers);
        ws.on('user-disconnected',removePeer);
    }, []);
    useEffect(()=>{ 
        if(!me)return;
        if(!stream)return;

        ws.on('user-joined', ({ peerId }) => {
            const call = me.call(peerId, stream);
            call.on('stream', (peerStream) => {
              dispatch(addPeerAction(peerId, peerStream));
            });
          });
          
        me.on('call',(call)=>{
            call.answer(stream);
            call.on('stream',(peerStream)=>{
                dispatch(addPeerAction(call.peer,peerStream))
        });
        });
    },[me,stream]);

    console.log({peers})
    return (
      
            <RoomContext.Provider value={{ ws ,me ,stream,peers}}>
                {children}
            </RoomContext.Provider>
   
    );
}


