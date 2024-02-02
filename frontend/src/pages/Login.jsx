import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice.js'
import Spinner from '../components/Spinner.jsx'
import '../index.css'
import { motion } from 'framer-motion';
import { slideIn, navVariants, staggerContainer } from '../utils/motion.js'

import { MdLock, MdEmail } from "react-icons/md";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center' style={{ backgroundImage: `url('/bkgnd.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='glass  flex justify-center items-center'>
        <section>
          <form onSubmit={onSubmit}>
            <div className='my-8 flex justify-center items-center'>
              <input
                  type='email'
                  className=''
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
            </div>
            <div>
                <input
                  type='password'
                  className='mb-10'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
            </div>

            <div className='flex justify-center'>
              <button type='submit' className='special-btn text-[17px] px-[50px]'>
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login
