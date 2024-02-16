import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Login from "./pages/Login/index";
//import Register from "./pages/Register/index";
import Room from "./pages/Lobby/Room";
import { RoomProvider } from "./context/RoomContext";
import { ContextProvider } from "./context/Context";
import ViewParticipants from "./pages/ViewParticipants";
import ViewEvent from "./components/DetailedEvents/ViewEvent";
import MyRegistrations from "./pages/MyRegistrations";
import Events from "./pages/Events";
import EventsPage from "./pages/EventsPage/index";
import Dashboard from "./pages/Dashboard/index";
import { ContextWrapper } from "./user-context";
import Lobby from "./pages/Lobby/Lobby";
import { SocketProvider } from "./context/SocketProvider";
function App() {
  return (
    <div className="bg-primary-black h-full overflow-hidden">
      <ContextWrapper>
      <Router>
        <SocketProvider>
          {/* <ContextProvider> */}
            <div>
            
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="/events" element={<EventsPage/>}/>
                {/* <Route path="/events/createevent" element={<EventsPage/>}/> */}
                <Route path="/event/participants" element={<ViewParticipants />} />
                <Route path="/eventdetails" element={<ViewEvent />} />
                <Route path="/myregistrations" element={<MyRegistrations />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
               </Routes>
            </div>
            </SocketProvider>
          {/* </ContextProvider>
         */}
      </Router>
      </ContextWrapper>
      <ToastContainer />
    </div>
  );
}

export default App;
