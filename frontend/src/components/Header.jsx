import React from 'react'
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
import { NavItem,NavLink } from 'reactstrap'


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`pl-6 py-8 relative `}
    >
      <div className='absolute w-[50%] inset-0 gradient-01' />
      <div className={`mx-auto flex justify-between gap-8 ${styles.innerWidth}`}>
        <ul className='inline-flex justify-end text-white flex-row flex-grow'>
          <Link to='/'>
            <h1 className='text-[30px] leading-[30px] '>EvoX</h1>
          </Link>
          <div className='flex-grow' />

          {user ? (
            <div>
              <li className='special-btn mr-4 py-3'>
                <button onClick ={onLogout}>Logout</button>
              </li>
            </div>
          ) : (
            <div className='flex items-center'>
              <li className='special-btn mr-4 py-3'>
              <NavItem>
            <NavLink href="/login" >Login</NavLink>
          </NavItem>
              </li>
              <li className='special-btn mr-4 py-3' >
              <NavItem>
            <NavLink href="/register" >Register</NavLink>
          </NavItem>              </li>
            </div>
          )}

          <div className='flex items-center' >
         <li className='special-btn mr-4 py-3'>
            <NavItem>
            <NavLink href="/room" >Join Meeting</NavLink>
          </NavItem>
          </li>
          </div>
          <div className='flex items-center'>
          <li className='special-btn mr-4 py-3'>
            <NavItem>
            <NavLink href="/dashboard" >Events</NavLink>
          </NavItem>
          </li>
          </div>
        </ul>
      </div>
    </motion.header>
  );
}

export default Header;