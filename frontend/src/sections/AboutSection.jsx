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
          <span className='font-bold text-white'>Lorem </span>
          ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur veniam itaque officia officiis esse est saepe 
          <span className='font-bold text-white'> placeat perferendis </span>
          ,voluptatibus voluptas illum iusto nam nostrum, laudantium, quas vitae.
          Dolorem ipsum esse molestias officia magni,debitis assumenda blanditiis cum!
          <span className='font-bold text-white'> Harum </span>
          quasi accusamus esse, praesentium dignissimos in quisquam repellat cum,
          quos tempora nam voluptatibus quae molestias commodi
          <span className='font-bold text-white'> doloremque </span>
          id a consectetur adipisicing elit.
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
