import React from 'react'
import { motion } from 'framer-motion';
import '../index.css';
import { textContainer, textVariant2 } from '../utils/motion.js';


export const TypingText = ({title,textStyles}) => (
    <motion.p
        variants={textContainer}
        className={`font-normal text-[14px] mt-[100px] text-secondary-white
        ${textStyles}`}>
        {Array.from(title).map((Letter, index) => (
            <motion.span variants={textVariant2} key={index}>
                {Letter === ' ' ? '\u00A0' : Letter}
            </motion.span>
        ))}
        
    </motion.p>
);

export const TitleText = () => (
  <h2 className='text-white'>Features</h2>
);
