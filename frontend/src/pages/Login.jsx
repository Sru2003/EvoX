
// import { useState, useEffect } from 'react'
// //import { FaSignInAlt } from 'react-icons/fa'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { login, reset } from '../features/auth/authSlice.js'
// import Spinner from '../components/Spinner.jsx'
// import '../index.css'
// import { motion } from 'framer-motion';
// import { slideIn,navVariants,staggerContainer } from '../utils/motion.js'
// import Footer from '../components/Footer.jsx'
// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })

//   const { email, password } = formData

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   )

//   useEffect(() => {
//     if (isError) {
//       toast.error(message)
//     }

//     if (isSuccess || user) {
//       navigate('/')
//     }

//     dispatch(reset())
//   }, [user, isError, isSuccess, message, navigate, dispatch])

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()

//     const userData = {
//       email,
//       password,
//     }

//     dispatch(login(userData))
//   }

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <div className='h-[1000px]'>
//     <motion.div
//       variants={slideIn('right', 'tween', 0.2, 1)}
//       className='glass  flex justify-center items-center ml-[350px] mt-[50px]'>
//       <section>
//         <form onSubmit={onSubmit} >
//           <div className='my-8 b'>
//             <h1 className='text-[20px] font-serif'>
//               Enter Email:
//               <input
//               type='email'
//               className='ml-16'
//               id='email'
//               name='email'
//               value={email}
//               placeholder='Enter your email'
//               onChange={onChange}
//               />
//               </h1>
//           </div>
//           <div>
//            <h1 className='text-[20px] font-serif'>Enter Password:
//             <input
//               type='password'
//               className='mb-10 ml-8'
//               id='password'
//               name='password'
//               value={password}
//               placeholder='Enter password'
//               onChange={onChange}
//               />
//             </h1>
//           </div>

//           <div className='flex justify-center'>
//             <button type='submit' className='special-btn text-[17px] px-[50px]'>
//               Login
//             </button>
//           </div>
//         </form>
//       </section>
//       </motion.div>
//     </div>
//   )
// }

// export default Login

import React, { useState, useContext } from "react";
import api from "../Services/api";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { UserContext } from '../user-context';
import { useNavigate } from 'react-router-dom';
import SignIn from '../assets/LoginRegister/images/signin-image.jpg'

import { MdLock, MdEmail } from "react-icons/md";

function  Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/login", { email, password });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);

        setIsLoggedIn(true);
        navigate('/');
       
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Error is " + err);
    }
  };

  return (
    <div className='h-[1000px]'>
    <motion.div
      variants={slideIn('right', 'tween', 0.2, 1)}
      className='glass  flex justify-center items-center ml-[350px] mt-[50px]'>
      <section>
        <form onSubmit={onSubmit} >
          <div className='my-8 b'>
            <h1 className='text-[20px] font-serif'>
              Enter Email:
              <input
              type='email'
              className='ml-16'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              />
              </h1>
          </div>
          <div>
           <h1 className='text-[20px] font-serif'>Enter Password:
            <input
              type='password'
              className='mb-10 ml-8'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              />
            </h1>
          </div>

          <div className='flex justify-center'>
            <button type='submit' className='special-btn text-[17px] px-[50px]'>
              Login
            </button>
          </div>
        </form>
      </section>
      </motion.div>
    </div>
  );
}

export default Login