import React, { useRef } from 'react'
import styles from '../index.js'
import { motion } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from '../utils/motion.js';
import '../index.css';
import TopNav from '../components/TopNav.jsx';
//import ReactPlayer from 'react-player';
import AboutSection from '../sections/AboutSection.jsx';
import GetStarted from '../sections/GetStarted.jsx';
import ExploreSection from '../sections/ExploreSection.jsx';
import NewSection from '../sections/NewSection.jsx';
import Footer from '../components/Footer.jsx';
const HomePage = () => {
  const playerRef = useRef(null);
  return (
    <section className='justify-end overflow-hidden bg-primary-black'>
       <TopNav />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{once:false,amount:0.25}}
      >
        <div className="flex justify-center ml-[100px] text-[30px] 
        flex-col relative z-10 mt-[400px]">
          <motion.h1
            variants={textVariant(1.1)}
            className='text-white font-semibold font-serif'
          >
            EvoX
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className='text-white'
          >
            <h3 className='text-[#ffffff]'>Your Virtual Odyssey Starts Here </h3>
          </motion.div>
        </div>
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='relative w-full md:-mt-[20px] -mt-[12px]'
        >
          <div className='absolute w-full h-[300px] hero-gradient
          rounded-tl-[140px] z-[0] -top-[450px]'>
            <img
              src='/pic.png'
              alt='cover image'
              className='w-full sm:h-[500px] h-[350px] object-cover
                  rounded-tl-[130px] z-10 ml-2 mt-2'
            />
          </div>
        </motion.div>
      </motion.div>

      <div className='relative'>
        < AboutSection />
        <div className='gradient-03 z-0'/>
         < ExploreSection />
      </div>
        <div className='relative'>
        < GetStarted />
        <div className='gradient-03 z-0' />
        {/* < NewSection /> */}
      </div>
      <Footer />
    </section>
  )
}

export default HomePage