
// import { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { register, reset } from '../features/auth/authSlice.js'; // Fixed the casing in the import statement
// import Spinner from '../components/Spinner.jsx'; // Added import for Spinner
// import 'react-toastify/dist/ReactToastify.css'; // Added import for react-toastify CSS
// import '../index.css'
// import { motion } from 'framer-motion';
// import { slideIn,navVariants,staggerContainer } from '../utils/motion.js'


// function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: ''
//   });
//   const { name, email, password, password2 } = formData

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

//   useEffect(() => {
//     if (isError) {
//       toast.error(message)
//       dispatch(reset())
//     }
//     if (isSuccess || user) {
//       navigate('/')
//       dispatch(reset())
//     }
//   }, [user, isError, isSuccess, message, navigate, dispatch])

//   const onChange = (e) => {
//     setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()

//     if (password !== password2) {
//       toast.error('Passwords do not match')
//     } else {
//       const userData = {
//         name,
//         email,
//         password
//       }
//       dispatch(register(userData))
//     }
//   }

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <div className='h-[1000px]'>
//     <motion.div
//       variants={slideIn('right', 'tween', 0.2, 1)}
//       className='glass flex justify-center items-center  ml-[350px] mt-[50px]'
//     >
//       <section>
//         {/* <h1>Register</h1>
//         <p> Please create an account</p> */}
//       </section>
//       <section className="form">
//         <form onSubmit={onSubmit}>
//           <div className="my-8">
//             <h1 className='text-[19px] font-serif '>
//               Enter username:
//               <input type="text"
//               className='ml-14'
//               id='name'
//               name='name'
//               value={name}
//               placeholder='Enter your name'
//               onChange={onChange} />
//               </h1>
//           </div>
//           <div>
//             <h1 className='text-[19px] font-serif '>
//               Enter E-mail:
//             <input type="email"
//               className='mb-10 ml-[85px]'
//               id='email'
//               name='email'
//               value={email}
//               placeholder='Enter your email'
//                 onChange={onChange} />
//               </h1>
//           </div>
//           <h1 className='text-[19px] font-serif '>
//             Enter Password:
//             <input type="password"
//               className='mb-10 ml-16'
//               id='password'
//               name='password'
//               value={password}
//               placeholder='Enter password'
//                 onChange={onChange} />
//              </h1> 
          
//           <div>
//             <h1 className='text-[19px] font-serif '>
//               Re-Enter Password:
//               <input type="password" 
//               className='mb-10 ml-8'
//               id='password2'
//               name='password2'
//               value={password2}
//               placeholder='Confirm password'
//               onChange={onChange} />
//             </h1>
//           </div>
//           <div className='flex justify-center'>
//             <button type='submit' className='special-btn text-[17px] px-[50px] btn-block'>
//               SignUp
//             </button>
//           </div>
//         </form>
//       </section>
//       </motion.div>
//       </div>
//   );
// }

// export default Register

import React, { useState, useContext } from "react";
import api from "../Services/api";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { UserContext } from '../user-context';
import '../assets/LoginRegister/css/style.css'
import SignUp from '../assets/LoginRegister/images/signup-image.jpg'

import { MdLock, MdEmail, MdPerson } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate()
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
      });
      const user = response.data.user || false;
      const user_id = response.data.user_id || false;

      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);//user_item
        setIsLoggedIn(true);
        console.log(response.data)
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
    } else {
      setError(true);
      setErrorMessage("You need to fill all the Inputs");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <Form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name">
                    <MdPerson fontSize="large" />
                  </label>
                  <input onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                    type="text"
                    name="firstName"
                    id="examplefirstName"
                    placeholder="Your first name" />
                </div>
                <div className="form-group">
                  <label for="name"><MdPerson fontSize="large" /></label>
                  <input onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                    type="text"
                    name="lastName"
                    id="examplelastName"
                    placeholder="Your last name" />
                </div>
                <div className="form-group">
                  <label for="email"><MdEmail fontSize="large" /></label>
                  <input onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label for="pass"><MdLock fontSize="large" /></label>
                  <input onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Password" />
                </div>
                <FormGroup>
                  <Button color="success" className="submit-btn " size="lg">Register</Button>
                </FormGroup>

              </Form>
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  Missing required information
                </Alert>
              ) : (
                  ""
                )}
            </div>
            <div className="signup-image">
              <figure><img src={SignUp} alt="sign up image" /></figure>
              <a onClick={() => {
                navigate("/login");
              }} className="signup-image-link" style={{ cursor: "pointer" }}>I am already member</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
