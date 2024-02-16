// import { useEffect,useCallback,useState} from "react"
// import ReactPlayer from 'react-player';
// import { useSocket } from "../../context/SocketProvider"
// import peer from '../../service/peer'

// const Room=()=>{
//   const socket =useSocket();
//   const [remoteSocketId,setRemoteSocketId]=useState(null);
//   const [myStream,setMyStream]= useState();
//   const [remoteStream,setRemoteStream]=useState();

//   const handleUserJoined =useCallback(({username,id})=>{
//     console.log(`Username ${username}  joined room`);
//     setRemoteSocketId(id);
//   },[]);

//   const handleCallUser= useCallback(async () =>{
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });

//       const offer = await peer.getOffer();
//       socket.emit('user:call',{to:remoteSocketId,offer})
//       setMyStream(stream);
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//   })

//   const handleIncomingCall =useCallback(async ({from,offer})=>{
//     setRemoteSocketId(from);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });

//       setMyStream(stream);
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//     console.log(`Incoming call`,from,offer)
//     const ans= await peer.getAnswer(offer)
// socket.emit('call:accepted',{to:from,ans})
//   },[])
  
//   const sendStreams=useCallback(()=>{
//     for(const track of myStream.getTracks()){
//       peer.peer.addTrack(track,myStream)
//     }
//   },[myStream])
//   const handleCallAccepted= useCallback(async (from,ans)=>{
//     await peer.setLocalDescription(ans)
//     console.log('Call Accepted!');
//     sendStreams();
//   },[sendStreams])

//   const handleNegotiationNeeded=useCallback(async ()=>{
//     const offer = await peer.getOffer();
//       socket.emit('peer:nego:needed',{offer,to:remoteSocketId})
    
//   },[])

//   const handleNegotiationNeededIncoming=useCallback(async ({from,offer})=>{
//     const ans =await peer.getAnswer(offer);
//     socket.emit('peer:nego:done',{to:from,ans})
//   },[]);

//   const handleNegoNeedFinal=useCallback(async({ans})=>{
//     await peer.setLocalDescription(ans)
//   },[])
//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
//     };
//   }, [handleNegotiationNeeded]);
  
//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);
//   useEffect(()=>{
//     socket.on('user:joined',handleUserJoined);
//     socket.on('incoming:call',handleIncomingCall);
//     socket.on('call:accepted',handleCallAccepted);
//     socket.on('peer:nego:needed',handleNegotiationNeededIncoming);
//     socket.on('peer:nego:final',handleNegoNeedFinal);
//     return()=>{
//       socket.off('user:joined',handleUserJoined);
//       socket.off('incoming:call',handleIncomingCall);
//       socket.off('call:accepted',handleCallAccepted);
//       socket.off('peer:nego:needed',handleNegotiationNeededIncoming);
//     socket.off('peer:nego:final',handleNegoNeedFinal);
   
//     }
//   },[socket, handleUserJoined, handleCallUser, handleCallAccepted, handleNegotiationNeededIncoming, handleNegoNeedFinal])

//   return(<div>
//   <h1>Room</h1>
  
//   <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
//   {myStream && <button onClick={sendStreams}>Send Stream</button>}
//     {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
//     {
//       myStream && <><h2>My Stream</h2><ReactPlayer playing muted height="300px" width="500" url={myStream}/></>
//     }
//     {
//       remoteStream && <><h2>Remote Stream</h2><ReactPlayer playing muted height="300px" width="500" url={remoteStream}/></>
//     }
//   </div>)
// }

// export default Room