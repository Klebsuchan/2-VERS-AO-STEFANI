import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, duration = 0.8, yOffset = 50, className = '' }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration, 
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom ease out cubic curve for that "magical" snap
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
