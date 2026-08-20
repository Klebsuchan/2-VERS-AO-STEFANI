import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increased time slightly to allow the majestic animation to play out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1400); // Wait for the exit sweep
    }, 3400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const word1 = "DETALHES".split("");
  const word2 = "ART".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-brand-cream flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-yellow/10 via-brand-cream to-brand-cream opacity-80" />
          
          <motion.div 
            className="flex flex-col items-center relative z-10"
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
            initial="hidden"
            animate="visible"
          >
            <div className="flex gap-4 md:gap-6 items-baseline overflow-hidden px-4 py-2 perspective-1000">
              {/* DETALHES */}
              <div className="flex">
                {word1.map((char, index) => (
                  <motion.span 
                    key={`w1-${index}`}
                    variants={{
                      hidden: { y: "120%", opacity: 0, rotateX: -60, scale: 0.8 },
                      visible: { y: "0%", opacity: 1, rotateX: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-bodoni font-bold tracking-[0.1em] text-brand-black origin-bottom inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* ART */}
              <div className="flex">
                {word2.map((char, index) => (
                  <motion.span 
                    key={`w2-${index}`}
                    variants={{
                      hidden: { y: "120%", opacity: 0, rotateX: -60, scale: 0.8 },
                      visible: { y: "0%", opacity: 1, rotateX: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-bodoni font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#F9E596] to-[#AA7C11] inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Glowing Line */}
            <motion.div 
               initial={{ scaleX: 0, opacity: 0 }}
               animate={{ scaleX: 1, opacity: 1 }}
               transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
               className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full mt-8 max-w-[200px] md:max-w-sm"
               style={{ transformOrigin: "center" }}
            />
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
              className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-brand-black/60"
            >
              Fotografia de Alto Padrão
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
