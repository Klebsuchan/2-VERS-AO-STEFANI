import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function TypographyQuoteSection() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={ref} className="relative py-40 bg-brand-cream text-brand-black overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Decorative large background text */}
      <motion.div 
        style={{ y: y2, opacity: 0.03 }}
        className="absolute w-full text-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[25vw] font-bodoni font-black whitespace-nowrap leading-none tracking-tighter">
          TYPE
        </span>
      </motion.div>

      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="container mx-auto px-6 max-w-5xl relative z-10 text-center flex flex-col items-center"
      >
        <div className="w-16 h-1 bg-brand-red mb-12"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-bodoni leading-[1.1] md:leading-[1.1] mb-8 text-brand-black">
          "A tipografia é a caligrafia do criador. <br className="hidden md:block"/>
          <span className="italic text-brand-red">É um elemento que chama a atenção.</span> <br className="hidden md:block"/>
          É bela e comunicativa."
        </h2>
        
        <div className="flex items-center gap-4 mt-8">
          <div className="h-[1px] w-12 bg-brand-cream/20"></div>
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-black/50">
            A Essência do Design
          </span>
          <div className="h-[1px] w-12 bg-brand-cream/20"></div>
        </div>
      </motion.div>
    </section>
  );
}
