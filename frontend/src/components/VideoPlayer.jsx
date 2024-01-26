import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/Context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  const videoStyles = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {stream && (
        <div style={{ textAlign: 'center', margin: '10px' }}>
          <h3>{name || 'Name'}</h3>
          <video playsInline muted ref={myVideo} autoPlay style={videoStyles} />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div style={{ textAlign: 'center', margin: '10px' }}>
          <h3>{call.name || 'Name'}</h3>
          <video playsInline ref={userVideo} autoPlay style={videoStyles} />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
