import React from 'react'
import styles from '../index.js'
import { motion } from 'framer-motion';
import '../index.css';
import {TypingText} from '../components/CustomTexts.jsx'
import { fadeIn, staggerContainer } from '../utils/motion.js';


const AboutSection = () => {
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className='gradient-02 z-0'/>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter}
        flex-col`}>
        <TypingText title="| About EvoX"
          textStyles="text-center" />
        
        <motion.p variants={fadeIn('up', 'tween', 0.2, 1)}
          className='mt-[8px] font-normal sm-text-[32px] 
            text-[20px] text-center text-secondary-white'>
          <span className='font-bold text-white'>EvoX </span>
          , our website, simplifies virtual event management by providing a platform for organizing
          <span className='font-bold text-white'>  webinars </span>
          , customized registration
          <span className='font-bold text-white'> forms </span>
          , pre-designed email invitations and Instagram ad templates, as well as
          <span className='font-bold text-white'> live transcriptions </span>
          and <span className='font-bold text-white'> session summaries </span>
          .Its user-friendly features offer complete control of services to user, making it the future of event management.
        </motion.p>

        <motion.img
          variants={fadeIn('up', 'tween', 0.3, 1)}
          src="/arrow-down.svg"
          alt='arrow down'
          className='w-[18px] h-[28px] object-contain mt-[28px]'
        />
          
      </motion.div>
   </section>
  )
}

export default AboutSection