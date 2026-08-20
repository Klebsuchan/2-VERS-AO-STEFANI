import { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface CarouselItem {
  id: number;
  img: string;
  caption?: string;
}

export function RoundCarousel({ items }: { items: CarouselItem[] }) {
  const [rotation, setRotation] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const angle = 360 / items.length;

  const nextSlide = () => setRotation((prev) => prev - angle);
  const prevSlide = () => setRotation((prev) => prev + angle);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden [perspective:1400px]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="relative w-[280px] md:w-[400px] h-[400px] md:h-[550px] [transform-style:preserve-3d] cursor-grab active:cursor-grabbing"
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1.5 }}
        >
          {items.map((item, i) => {
            const itemAngle = i * angle;
            return (
              <div
                key={item.id}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-brand-black/5 group cursor-pointer"
                style={{
                  // clamp value scales the radius dynamically from mobile to desktop
                  transform: `rotateY(${itemAngle}deg) translateZ(clamp(250px, 40vw, 500px))`,
                  // Esconde as costas da imagem para evitar reflexo invertido confuso 
                  // e focar sempre nos itens frontais
                  backfaceVisibility: 'hidden'
                }}
                onClick={() => handleImageClick(i)}
                data-cursor="view"
              >
                <img 
                  src={item.img} 
                  alt={item.caption || "Gallery"} 
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-cream/50 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                
                {item.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 pointer-events-none">
                    <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs md:text-sm drop-shadow-md px-4 text-center">
                      {item.caption}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Controles (Visíveis principalmente no Desktop, no mobile o usuário arrasta) */}
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
        
        <div className="absolute bottom-6 text-brand-yellow/70 text-[10px] uppercase tracking-widest md:hidden font-bold">
          Arraste para girar
        </div>
      </div>

      <Lightbox 
        images={items.map((item, i) => ({ id: i, img: item.img, title: item.caption }))}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % items.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)}
      />
    </>
  );
}
