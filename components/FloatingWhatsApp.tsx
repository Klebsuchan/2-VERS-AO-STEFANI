import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px down
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show tooltip intermittently
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 20000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Estava navegando no seu site e gostaria de saber mais sobre o seu trabalho.')}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 z-[90] flex flex-col items-start gap-3"
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                className="bg-brand-cream text-brand-black px-4 py-3 rounded-2xl shadow-xl border border-brand-black/5 ml-2 relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-bold leading-tight">Gostou do portfólio?<br/><span className="font-medium text-brand-black/70">Vamos conversar no WhatsApp!</span></p>
                  <button onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }} className="text-gray-400 hover:text-brand-black">
                    <X size={14} />
                  </button>
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-brand-cream border-b border-l border-brand-black/5 transform -rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleClick}
            className="w-16 h-16 bg-[#25D366] text-brand-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group cursor-hover"
            onMouseEnter={() => setShowTooltip(true)}
            data-cursor="view"
          >
            {/* Pulsing effect */}
            <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50 group-hover:opacity-0"></div>
            <MessageCircle size={32} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
