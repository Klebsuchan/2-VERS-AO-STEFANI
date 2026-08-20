import { motion } from 'motion/react';

export function PremiumBadge() {
  return (
    <div className="fixed bottom-[20px] right-[95px] sm:bottom-[28px] sm:right-[116px] z-[999999] w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] bg-[#0d0c0b] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.8)] border border-[#D4AF37] backdrop-blur-xl overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="opacity-90 scale-[0.85]">
          <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
          <text fontSize="11" fontWeight="bold" letterSpacing="3.8" fill="#D4AF37">
            <textPath href="#circlePath" startOffset="0%">
              DETALHES ART • FOTOGRAFIA • 
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gold-gradient-bg opacity-100 shadow-[0_0_15px_rgba(212,175,55,1)]"></div>
    </div>
  );
}
