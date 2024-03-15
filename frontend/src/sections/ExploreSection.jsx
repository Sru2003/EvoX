import React from 'react'
import {useState} from 'react'
import styles from '../index.js'
import { motion } from 'framer-motion';
import '../index.css';
import Startsteps from '../components/Startsteps.jsx'
import { fadeIn, staggerContainer,planetVariants } from '../utils/motion.js';
import { TitleText, TypingText } from '../components/CustomTexts.jsx';
import { startingFeatures } from '../index.js';

const ExploreSection = () => {
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: 'false', amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex 
        lg:flex-row flex-col gap-8`}
      >
      <motion.div
          variants={planetVariants('left')}
          className={`${styles.flexCenter} flex-1`}
        >
         <div className='object-contain grad rounded-full mt-20'>
          <img
            src='/Circle1.png'
            alt='circle 1'
            className='px-2 py-2 h-[300px]'
          />
          </div>
        </motion.div>
        
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title='| Features' />
          <TitleText title={<>Get started with just a clicks</>} feature={'Create Your Event'}/>
          <div className='mt-[31px] flex flex-col max-w-[370px]
          gap=[24px]'>
{/*             
            <Startsteps
              
            /> */}
            <div className={`${styles.flexCenter} flex-row  text-secondary-white`}>
              <p>Organize a gathering of your choosing and post it on our website to attract users. There is a page on our website where you can make your own custom events, such as webinars, workshops, or meetings.
            </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ExploreSection