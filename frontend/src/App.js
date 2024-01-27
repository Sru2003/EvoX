import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Room from "./pages/Room";
import { RoomProvider } from "./context/RoomContext";
import { ContextProvider } from "./context/Context";
import ViewParticipants from "./pages/ViewParticipants";
import ViewEvent from "./components/DetailedEvents/ViewEvent";
import MyRegistrations from "./pages/MyRegistrations";
import Events from "./pages/Events";
function App() {
  return (
    <div className="bg-primary-black  h-screen overflow-hidden">
      <Router>
        <RoomProvider>
          <ContextProvider>
            <div>
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/room" element={<Room />} />
                <Route path="/events" element={<Events/>}/>
                <Route
                  path="/events/myregistrations"
                  element={<MyRegistrations/>}
                />
                <Route
                  path="/events/event/participants"
                  element={<ViewParticipants/>}
                />
                <Route path="/events/eventdetails" element={<ViewEvent/>} />
              </Routes>
            </div>
          </ContextProvider>
        </RoomProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
