import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxProps {
  images: { id: number; img: string; title?: string; description?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-cream/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-6 right-6 text-brand-black/70 hover:text-brand-black transition-colors p-2 z-[201]"
        >
          <X size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-12 text-brand-black/50 hover:text-brand-black transition-colors p-4 z-[201]"
        >
          <ChevronLeft size={48} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-12 text-brand-black/50 hover:text-brand-black transition-colors p-4 z-[201]"
        >
          <ChevronRight size={48} />
        </button>

        <div 
          className="relative max-w-5xl w-full max-h-[85vh] p-4 flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={currentImage.img}
            alt={currentImage.title || 'Galeria'}
            className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-lg"
          />
          {(currentImage.title || currentImage.description) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center max-w-2xl"
            >
              {currentImage.title && <h3 className="text-brand-yellow font-bold text-xl mb-2">{currentImage.title}</h3>}
              {currentImage.description && <p className="text-brand-black/80 text-sm">{currentImage.description}</p>}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
