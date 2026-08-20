import { motion } from 'motion/react';

const ITEMS = [
  "FOTOGRAFIA DE PRODUTO",
  "✦",
  "EDITORIAL DE MODA",
  "✦",
  "RETRATOS CORPORATIVOS",
  "✦",
  "CAMPANHAS",
  "✦",
  "DIREÇÃO DE ARTE",
  "✦",
  "CASAMENTOS LUXO",
  "✦"
];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-brand-cream text-brand-black py-4 border-y border-brand-yellow/20 flex items-center">
      <motion.div 
        className="flex whitespace-nowrap gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        <div className="flex gap-8 items-center px-4">
           {ITEMS.map((item, i) => (
             <span key={`first-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
           {ITEMS.map((item, i) => (
             <span key={`second-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
           {ITEMS.map((item, i) => (
             <span key={`third-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
        </div>
        <div className="flex gap-8 items-center px-4">
           {ITEMS.map((item, i) => (
             <span key={`first-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
           {ITEMS.map((item, i) => (
             <span key={`second-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
           {ITEMS.map((item, i) => (
             <span key={`third-${i}`} className={`text-[10px] md:text-xs tracking-[0.25em] font-bodoni font-bold gold-gradient-text ${item === '✦' ? 'text-sm' : ''}`}>{item}</span>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
