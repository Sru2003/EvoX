import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Login from "./pages/Login/index";
//import Register from "./pages/Register/index";
import Room from "./pages/Room";
import { RoomProvider } from "./context/RoomContext";
import { ContextProvider } from "./context/Context";
import ViewParticipants from "./pages/ViewParticipants";
import ViewEvent from "./components/DetailedEvents/ViewEvent";
import MyRegistrations from "./pages/MyRegistrations";
import Events from "./pages/Events";
import EventsPage from "./pages/EventsPage/index";
import Dashboard from "./pages/Dashboard/index";
import { ContextWrapper } from "./user-context";
import JoinMeet from "./pages/JoinMeet";
function App() {
  return (
    <div className="overflow-hidden">
      <ContextWrapper>
      <Router>
        
          <ContextProvider>
            <div>
            
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/room" element={<JoinMeet />} />
                <Route path="/events" element={<EventsPage/>}/>
                {/* <Route path="/events/createevent" element={<EventsPage/>}/> */}
                <Route path="/event/participants" element={<ViewParticipants />} />
                <Route path="/eventdetails" element={<ViewEvent />} />
                <Route path="/myregistrations" element={<MyRegistrations />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/room/:roomID" element={<Room />} />
               </Routes>
            </div>
          </ContextProvider>
        
      </Router>
      </ContextWrapper>
      <ToastContainer />
    </div>
  );
}

export default App;
