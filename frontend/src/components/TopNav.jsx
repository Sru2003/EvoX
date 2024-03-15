import React,{useState,useContext} from 'react'
//import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link,useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { reset } from '../features/auth/authSlice'
import styles from '../index.js'
import { motion } from 'framer-motion';
import { navVariants } from '../utils/motion.js';
import '../index.css'
import { Join } from './CreateButton';
import { UserContext } from '../user-context.js';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap'; 


function TopNav() {
    
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
 
  //const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.auth);

  // const onLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   navigate('/');
  // };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setTimeout(() => {
        setIsLoggedIn(false);
    }, 500);
}

  return isLoggedIn ?
    <motion.header
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`pl-6 py-8 relative`}
    >
      <div className='absolute w-[20px] inset-0 gradient-01' />
      <div className={`mx-auto flex justify-between gap-8 ${styles.innerWidth}`}>
        <ul className='inline-flex justify-center items-center text-white flex-row flex-grow'>
          <Link to='/'>
            <div>
               <h1 className='text-[30px] leading-[30px] text-white'>EvoX</h1>
            </div>
           
          </Link>
          <div className='flex-grow' />
          
            <div className='flex items-center text-[20px] hover:scale-105 hover:underline'>
         <li className='mr-4 py-3'>
            <NavItem>
            <NavLink href="/dashboard" >Dashboard</NavLink>
          </NavItem>
          </li>
          </div><div className='flex items-center text-[20px] hover:scale-105 hover:underline'>
         <li className='mr-4 py-3'>
            <NavItem>
            <NavLink href="/room" >Join Meeting</NavLink>
          </NavItem>
          </li>
          </div>

          <div className='flex items-center text-[20px] hover:scale-105 hover:underline'>
         <li className='mr-4 py-3'>
            <NavItem>
            <NavLink href="/myregistrations">My Registrations</NavLink>
          </NavItem>
          </li>
          </div>
          <div className='flex items-center text-[20px] hover:scale-105 hover:underline'>
          <li className='mr-4 py-3'>
            <NavItem>
            <NavLink href="/events" >Create Event</NavLink>
          </NavItem>
          </li>
          </div>
      <div>
        <li className='mr-4 py-3 text-[20px] button 
            transition duration-300 ease-in-out transform hover:scale-105'>
       <Nav>
         <a href="/login" onClick={logoutHandler}>              
          <Button >Logout</Button>
         </a>
       </Nav>              
      </li>
    </div>
    </ul>
    </div>
    </motion.header>
    :
    <motion.header
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`pl-6 py-8 relative`}
    >
      <div className='absolute w-[50%] inset-0 gradient-01' />
      <div className={`mx-auto flex justify-between gap-8 ${styles.innerWidth}`}>
        <ul className='inline-flex justify-center items-center text-white flex-row flex-grow'>
          <Link to='/'>
            <h1 className='text-[30px] leading-[30px]'>EvoX</h1>
          </Link>
          <div className='flex-grow' />

            <div className='flex items-center'>
              <li className='mr-4 py-3 text-[20px] hover:scale-105 hover:underline'>
              <NavItem>
            <NavLink href="/login" >Login</NavLink>
          </NavItem>
              </li>
              <li className='mr-4 py-3 text-[20px] hover:scale-105 hover:underline'>
              <NavItem>
            <NavLink href="/register" >Sign Up</NavLink>
          </NavItem>              
          </li>
            </div>


          <div className='flex items-center text-[20px] hover:scale-105 hover:underline'>
         <li className='mr-4 py-3'>
            <NavItem>
            <NavLink href="/room" >Join Meeting</NavLink>
          </NavItem>
          </li>
          </div>
        </ul>
      </div>
    </motion.header>
  
}

export default TopNav;