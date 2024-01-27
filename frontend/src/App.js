import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import {Room} from "./pages/Room";
import { RoomProvider } from "./context/RoomContext"
function App() {
  return (
    <div className="bg-primary-black overflow-hidden">
      <Router>
        <RoomProvider>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>

        </div>
        </RoomProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
