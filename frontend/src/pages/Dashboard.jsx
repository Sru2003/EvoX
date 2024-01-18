import React, { useRef } from 'react'
import styles from '../index.js'
import { motion } from 'framer-motion';
import { navVariants, slideIn, staggerContainer, textVariant } from '../utils/motion.js';
import '../index.css';
import ReactPlayer from 'react-player';
import AboutSection from './AboutSection';
import GetStarted from './GetStarted';
import ExploreSection from './ExploreSection';
import NewSection from './NewSection';
const HeroSection = () => {
  const playerRef = useRef(null);
  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      {/* <motion.div>
        <ReactPlayer ref={playerRef} url='{C:\Users\mayur\Desktop\sdp1\EvoX\frontend\public\}' controls={true} />
      </motion.div> */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{once:false,amount:0.25}}
      >
        <div className="flex justify-center items-center 
        flex-col relative z-10">
          <motion.h1
            variants={textVariant(1.1)}
            className='text-white'
          >
            EvoX
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className='text-white'
          >
            Where Ideas evolve
          </motion.div>
        </div>
      </motion.div>
      <AboutSection />
          <ExploreSection />
          <GetStarted />
          <NewSection />
    </section>
  )
}

export default HeroSection
