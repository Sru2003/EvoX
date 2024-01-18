import { ADD_PEER,REMOVE_PEER } from "./peerActions";

const PeerState ={stream:null};
const PeerAction={
    type: typeof ADD_PEER, 
    payload: {peerId:"",stream:null}}
    |{type: typeof REMOVE_PEER,
        payload:{peerId:""}}
export const peerReducer = (state = PeerState, action = PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: action.payload.stream,
            };
        case REMOVE_PEER:
            const { [action.payload.peerId]:deleted, ...rest }=state;
            return rest;
        default:
            return{ ...state};
    };
    };