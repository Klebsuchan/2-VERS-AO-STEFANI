import { motion } from 'motion/react';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  finalShadow?: string;
}

export function StaggeredText({ 
  text, 
  className = "", 
  delay = 0,
  finalShadow = "0 4px 16px rgba(0,0,0,0.06)"
}: StaggeredTextProps) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      textShadow: "0px 0px 0px rgba(240, 165, 0, 0)",
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      textShadow: [
        "0px 0px 0px rgba(240, 165, 0, 0)",
        "0px 0px 24px rgba(240, 165, 0, 0.8)",
        finalShadow
      ],
      filter: ["blur(6px)", "blur(0px)", "blur(0px)"],
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
        textShadow: { duration: 1.2, ease: "easeOut" }
      }
    }
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
          {word.split("").map((char, charIdx) => (
            <motion.span key={charIdx} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
