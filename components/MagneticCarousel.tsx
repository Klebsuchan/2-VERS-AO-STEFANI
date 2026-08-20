import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CarouselItem {
  id: number;
  img: string;
  caption?: string;
}

export function MagneticCarousel({ items }: { items: CarouselItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    // Pequeno delay para garantir que as imagens carregaram
    setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [items]);

  return (
    <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden pb-12">
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width }} 
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        className="flex gap-6"
      >
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="min-w-[280px] md:min-w-[400px] lg:min-w-[500px] h-[400px] md:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl group flex-shrink-0"
          >
            <img 
              src={item.img} 
              alt={item.caption || "Gallery"} 
              className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-cream/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            
            {item.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-8 pointer-events-none">
                <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm drop-shadow-md">
                  {item.caption}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
