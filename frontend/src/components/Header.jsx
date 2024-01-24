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

function Header () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} =useSelector((state)=>state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <motion.header 
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={` pl-6 py-8 relative`}
        >
            <div className='absolute w-[50%] inset-0 gradient-01'/>
            <div className={`${styles.innerWidth} mx-auto flex
            justify-between gap-8`}>
                


            </div>
                
                <ul className='inline-flex justify-end text-white flex-row'>
                <Link to='/'>
                    <h1 className='text-[30px]
                            leading-[30px] mr-[830px]'>
                        EvoX
                    </h1>
                </Link>
                
                    {user ? (<div>
                    <li className='special-btn font-serif ml-[80px]'>
                        <button onClick={onLogout}>
                       Logout
                        </button>
                    </li>
                    
                    </div>) :(<div className='inline-flex justify-end' >
                    <li className='special-btn mr-4'>
                    <Link to='/login'>
                       Login
                    </Link>
                    </li>
                      <li className='special-btn'>
                    <Link to='/register'>
                        SignUp 
                        </Link>
                    </li>              
                    </div>)}
                    
                    
                    <button >
                        <Join/>
                    </button>
                
                    
                    <li className=' object-contain mr-2 hover:scale-105 '>
                        <img src="/menu.svg"/>
                    </li>
                    
                </ul>
         
         
        </motion.header>
    )
}

export default Header