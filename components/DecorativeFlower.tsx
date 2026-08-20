import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface DecorativeFlowerProps {
  src: string;
  className: string;
  initialRotate?: number;
  swayRotate?: number;
  parallaxOffset?: number;
  opacity?: number;
  origin?: string;
}

export function DecorativeFlower({
  src,
  className,
  initialRotate = 0,
  swayRotate = 8,
  parallaxOffset = 40,
  opacity = 0.7,
  origin = "center"
}: DecorativeFlowerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [initialRotate - 5, initialRotate + 5]);

  // Aplica uma máscara de desfoque direcional para apagar a borda cortada nativa da imagem PNG
  const getMaskImage = (originMode: string) => {
    switch (originMode) {
      case 'top left': return 'linear-gradient(to bottom right, transparent 0%, black 25%, black 100%)';
      case 'top right': return 'linear-gradient(to bottom left, transparent 0%, black 25%, black 100%)';
      case 'bottom left': return 'linear-gradient(to top right, transparent 0%, black 25%, black 100%)';
      case 'bottom right': return 'linear-gradient(to top left, transparent 0%, black 25%, black 100%)';
      default: return 'none';
    }
  };

  const maskImage = getMaskImage(origin);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: rotateScroll, transformOrigin: origin }}
      className={`absolute pointer-events-none z-0 ${className}`}
    >
      <motion.img
        src={src}
        alt=""
        className="w-full h-full object-contain drop-shadow-xl"
        style={{ 
          opacity, 
          transformOrigin: origin,
          WebkitMaskImage: maskImage,
          maskImage: maskImage
        }}
        animate={{ rotate: [-swayRotate, swayRotate, -swayRotate] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
