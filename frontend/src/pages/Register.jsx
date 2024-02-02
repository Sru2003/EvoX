import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice.js'; // Fixed the casing in the import statement
import Spinner from '../components/Spinner.jsx'; // Added import for Spinner
import 'react-toastify/dist/ReactToastify.css'; // Added import for react-toastify CSS
import '../index.css'
import { motion } from 'framer-motion';
import { slideIn, navVariants, staggerContainer } from '../utils/motion.js'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess || user) {
      navigate('/')
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center' style={{ backgroundImage: `url('/bkgnd.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='glass flex justify-center items-center'>
        <section>
          <form onSubmit={onSubmit}>
            <div className="my-8 flex justify-center items-center">
              <input type="text"
                className=''
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange} />
            </div>
            <div>
              <input type="email"
                className='mb-10'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange} />
            </div>
            <input type="password"
              className='mb-10'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange} />
            <div>
              <input type="password"
                className='mb-10 '
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange} />
            </div>
            <div className='flex justify-center'>
              <button type='submit' className='special-btn text-[17px] px-[50px] btn-block'>
                SignUp
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register
