import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface Project {
  title: string;
  category: string;
  description?: string;
  img: string;
}

export function CoverflowGallery({ items }: { items: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const cardWidth = isMobile ? 260 : 350;
  const cardHeight = isMobile ? 380 : 500;
  const xOffset = isMobile ? 160 : 250;

  return (
    <>
      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden [perspective:1000px]">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              // Calculate relative position (-2, -1, 0, 1, 2)
              let offset = i - currentIndex;
              if (offset < -items.length / 2) offset += items.length;
              if (offset > items.length / 2) offset -= items.length;
              
              // Only render items that are close to the center to save performance
              if (Math.abs(offset) > 2) return null;

              const isCenter = offset === 0;
              const zIndex = 50 - Math.abs(offset) * 10;
              const scale = isCenter ? 1 : 1 - Math.abs(offset) * (isMobile ? 0.2 : 0.15);
              const rotateY = offset * -25;
              const x = offset * xOffset;
              const opacity = isCenter ? 1 : 1 - Math.abs(offset) * (isMobile ? 0.6 : 0.4);
              const blur = isCenter ? "blur(0px)" : "blur(4px)";

              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-3xl overflow-hidden cursor-pointer shadow-2xl group"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    marginTop: -cardHeight / 2,
                    marginLeft: -cardWidth / 2,
                  }}
                  initial={false}
                  animate={{
                    x,
                    rotateY,
                    scale,
                    zIndex,
                    opacity,
                    filter: blur
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 1
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setIsLightboxOpen(true);
                    } else {
                      setCurrentIndex(i);
                    }
                  }}
                  data-cursor={isCenter ? "view" : undefined}
                >
                  <motion.img 
                    style={{ y: yImage }} 
                    src={item.img} 
                    alt={item.title} 
                    className={`w-full h-[120%] -top-[10%] relative object-cover pointer-events-none transition-transform duration-700 ${isCenter ? 'group-hover:scale-105' : ''}`} 
                  />
                  
                  {isCenter && (
                    <div className="absolute inset-0 bg-brand-cream/0 group-hover:bg-brand-cream/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                      <div className="bg-brand-yellow text-brand-black p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                        <ZoomIn size={28} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-12 z-50 bg-brand-cream/50 hover:bg-brand-yellow text-brand-black hover:text-black p-4 rounded-full backdrop-blur-md transition-colors border border-brand-black/10"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-12 z-50 bg-brand-cream/50 hover:bg-brand-yellow text-brand-black hover:text-black p-4 rounded-full backdrop-blur-md transition-colors border border-brand-black/10"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 flex justify-center w-full gap-2 z-50">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-brand-yellow' : 'bg-brand-cream/30 hover:bg-brand-cream/50'
              }`}
            />
          ))}
        </div>
      </div>

      <Lightbox 
        images={items.map((item, i) => ({ id: i, img: item.img, title: item.title, description: item.description }))}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    </>
  );
}
