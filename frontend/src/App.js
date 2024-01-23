import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Dashboard from './pages/Dashboard.jsx';
import Footer from './components/Footer.jsx';
//import { Explore } from '@material-ui/icons';
import './index.css';
import styles from './index.js';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className= ' bg-primary-black overflow-hidden'>
      <Router>

        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard/>}/>
          </Routes>
          
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
