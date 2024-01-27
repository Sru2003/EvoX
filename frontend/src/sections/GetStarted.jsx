import React from 'react'
import {useState} from 'react'
import styles from '../index.js'
import { motion } from 'framer-motion';
import '../index.css';
import Startsteps from '../components/Startsteps.jsx'
import { fadeIn, staggerContainer,planetVariants } from '../utils/motion.js';
import { TitleText, TypingText } from '../components/CustomTexts.jsx';
import { startingFeatures } from '../index.js';

const GetStarted = () => {
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
          <img
            src='/whats-new.png'
            alt='get-started'
            className='w-[90%] h-[90%] object-contain'
          />
          
        </motion.div>
        
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title='| How EvoX Works' />
          <TitleText title={<>Get started with just a clicks</>} />
          <div className='mt-[31px] flex flex-col max-w-[370px]
          gap=[24px]'>
            {startingFeatures.map((feature, index)=>(
            <Startsteps
              key={feature}
              number={index + 1}
              text={feature}
            />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default GetStarted
