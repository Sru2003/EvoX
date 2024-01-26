import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Room from "./pages/Room";
import { RoomProvider } from "./context/RoomContext"
import { ContextProvider } from './context/Context';
import ViewParticipants from "./pages/ViewParticipants";
import ViewEvent from "./components/DetailedEvents/ViewEvent";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <div className="bg-primary-black overflow-hidden">
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
            <Route path="/myregistrations" exact component={ MyRegistrations } />
        <Route path="/event/participants" exact component={ ViewParticipants } />
        <Route path="/eventdetails" exact component={ ViewEvent } />          </Routes>

        </div>
        </ContextProvider>
        </RoomProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;