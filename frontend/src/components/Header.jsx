import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link,useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { reset } from '../features/auth/authSlice'
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
        <header className="header">
           
                <Link to='/'>
                    <h1>EvoX</h1>
                </Link>
                <ul>
                    {user ? (<div>
                    <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt />Logout
                    </button>
                    </li>
                    
                    </div>) :(<div>
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt />Login
                    </Link>
                    </li>
                                    
                    </div>)}
                    <li>
                    <Link to='/register'>
                        <FaUser />Register  
                        </Link>
                    </li>
                    
                </ul>
         
        </header>
    )
}

export default Header