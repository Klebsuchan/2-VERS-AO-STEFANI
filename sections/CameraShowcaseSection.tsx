import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'motion/react';
import { StaggeredText } from '../components/StaggeredText';
import { ArrowRight, Camera, Play, Aperture, Image as ImageIcon } from 'lucide-react';

// Dynamically import all frame images from the components directory
const frameModules = import.meta.glob('../components/frame_*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

const rawFrames = Object.keys(frameModules).map(key => ({
  url: frameModules[key] as string,
  index: parseInt(key.match(/frame_(\d+)/)?.[1] || '0', 10)
})).sort((a, b) => b.index - a.index); // Sort descending (90 to 1) so it starts assembled

const frames = rawFrames.map(f => f.url);

export function CameraShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageObjectsRef = useRef<HTMLImageElement[]>([]);
  
  // Track the scroll of the entire 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  const textParallaxX = useTransform(smoothMouseX, [-1, 1], [25, -25]);
  const textParallaxY = useTransform(smoothMouseY, [-1, 1], [25, -25]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const totalFrames = frames.length || 90; 
  const framesExist = frames.length > 0;
  
  useEffect(() => {
    if (!framesExist) return;
    
    // Preload images into HTMLImageElements for instantaneous Canvas drawing
    let loadedCount = 0;
    const images = frames.map(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setImagesLoaded(true);
          drawFrame(0); // Draw first frame when all are loaded
        }
      };
      return img;
    });
    
    imageObjectsRef.current = images;

    const handleResize = () => {
      if (canvasRef.current && imageObjectsRef.current.length > 0) {
        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;
        const rectWidth = window.innerWidth;
        const rectHeight = window.innerHeight;
        
        canvas.width = rectWidth * dpr;
        canvas.height = rectHeight * dpr;
        canvas.style.width = `${rectWidth}px`;
        canvas.style.height = `${rectHeight}px`;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
        }
        
        // Re-draw current frame on resize
        if (imagesLoaded) {
          const latestProgress = scrollYProgress.get();
          const frameIndex = Math.min(totalFrames - 1, Math.floor(latestProgress * totalFrames));
          drawFrame(Math.max(0, frameIndex));
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Add small delay to let CSS layout settle before calculating sizes
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [framesExist, totalFrames]); // scrollYProgress omitted intentionally to avoid re-binding

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = imageObjectsRef.current;
    
    if (!canvas || !ctx || !images[index]) return;
    
    const img = images[index];
    
    // We must use the actual physical canvas size for calculations 
    // to ensure no blurriness occurs during the draw call
    const physicalWidth = canvas.width;
    const physicalHeight = canvas.height;
    
    const hRatio = physicalWidth / img.width;
    const vRatio = physicalHeight / img.height;
    const ratio = Math.max(hRatio, vRatio); // Object-fit: cover equivalent
    
    const centerShift_x = (physicalWidth - img.width * ratio) / 2;
    const centerShift_y = (physicalHeight - img.height * ratio) / 2;  
    
    // Clear canvas
    ctx.clearRect(0, 0, physicalWidth, physicalHeight);
    
    // Ensure smoothing is on
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Temporarily reset transform to draw at physical pixel scale
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    
    // Draw centered and scaled to the physical dimensions
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                  
    ctx.restore();
  };
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;
    // Map scroll progress (0 to 1) to array index (0 to length - 1)
    const current = Math.min(totalFrames - 1, Math.floor(latest * totalFrames));
    // Use requestAnimationFrame for buttery smooth canvas updates
    requestAnimationFrame(() => drawFrame(Math.max(0, current)));
  });
  
  // Opacity interpolations for the main Hero texts
  const heroOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 1, 0]);
  const heroYLeft = useTransform(scrollYProgress, [0, 0.02, 0.05], ['0vh', '0vh', '-100vh']);

  // Dynamic Overlay Texts that appear sequentially during the scroll
  const overlay1Opacity = useTransform(scrollYProgress, [0.10, 0.18, 0.30, 0.40], [0, 1, 1, 0]);
  const overlay1Y = useTransform(scrollYProgress, [0.10, 0.18, 0.30, 0.40], ['50vh', '0vh', '0vh', '-50vh']);
  
  const overlay2Opacity = useTransform(scrollYProgress, [0.40, 0.48, 0.70, 0.80], [0, 1, 1, 0]);
  const overlay2Y = useTransform(scrollYProgress, [0.40, 0.48, 0.70, 0.80], ['50vh', '0vh', '0vh', '-50vh']);

  const overlay3Opacity = useTransform(scrollYProgress, [0.80, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const overlay3Y = useTransform(scrollYProgress, [0.80, 0.85, 0.95, 1], ['50vh', '0vh', '0vh', '-50vh']);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0d0c0b] perspective-1000" onMouseMove={handleMouseMove}>
      
      {/* Sticky Container - This stays fixed while user scrolls */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black perspective-1000">
        
        {/* Frame Sequence Container */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center bg-black transform-style-3d"
          style={{ x: parallaxX, y: parallaxY, rotateX, rotateY, scale: 1.05 }}
        >
          {framesExist ? (
            <canvas 
              ref={canvasRef}
              className="w-full h-full object-cover transition-none will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          ) : (
            <div className="w-full h-full border border-brand-red/20 border-dashed flex flex-col items-center justify-center text-[#fbfaf8]/50 bg-black/50">
              <Camera size={48} className="mb-4 text-brand-red opacity-50" />
              <p className="font-bold tracking-widest uppercase text-sm mb-2">Contêiner de Montagem 3D</p>
              <p className="text-xs max-w-md text-center">
                Adicione as imagens da câmera em <code className="text-brand-red">/src/components/</code> <br/>
                sendo <code className="text-brand-red">frame_001.png</code> até <code className="text-brand-red">frame_090.png</code>.
              </p>
            </div>
          )}
        </motion.div>

        {/* Minimal vignettes to keep text readable without darkening the main image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0"></div>

        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ x: textParallaxX, y: textParallaxY }}
        >
          {/* ======================================================== */}
          {/* ======================================================== */}
          {/* 1. INITIAL SCROLL PROMPT (Fades out quickly) */}
          {/* ======================================================== */}
          <div className="absolute inset-0 px-8 lg:px-32 flex flex-col items-start justify-center pointer-events-none">
            <motion.div 
              style={{ opacity: heroOpacity, y: heroYLeft }}
              className="flex flex-col items-start text-left relative z-20 pointer-events-none bg-transparent backdrop-blur-md border border-[#fbfaf8]/10 p-10 rounded-3xl"
            >
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-[#fbfaf8] tracking-widest uppercase">
                A Arte por Trás <br/> <span className="gold-gradient-text italic font-bodoni lowercase">da lente</span>
              </h2>
              <p className="text-xs md:text-sm text-[#fbfaf8]/50 uppercase tracking-[0.3em] animate-pulse">
                [ Role para explorar ]
              </p>
            </motion.div>
          </div>

        {/* ======================================================== */}
        {/* 2. DYNAMIC SCROLL OVERLAYS */}
        {/* ======================================================== */}
        
        {/* Overlay 1: A Visão (Aligned Right) */}
        <motion.div 
          style={{ opacity: overlay1Opacity, y: overlay1Y }}
          className="absolute inset-0 z-20 flex flex-col items-end justify-center pointer-events-none px-8 lg:px-32"
        >
          <div className="w-full lg:w-[45%] flex flex-col items-end text-right">
            <Aperture className="w-12 h-12 text-brand-red mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold text-[#fbfaf8] mb-4 tracking-tight drop-shadow-2xl">
              Precisão Milimétrica
            </h2>
            <p className="text-lg md:text-xl text-[#fbfaf8]/80 max-w-md font-medium drop-shadow-md">
              Desmontamos a complexidade para revelar a verdadeira essência da sua marca. Cada elemento é posicionado estrategicamente.
            </p>
          </div>
        </motion.div>

        {/* Overlay 2: O Equipamento (Aligned Left) */}
        <motion.div 
          style={{ opacity: overlay2Opacity, y: overlay2Y }}
          className="absolute inset-0 z-20 flex flex-col items-start justify-center pointer-events-none px-8 lg:px-32"
        >
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
            <div className="border-l-4 border-brand-red pl-8">
              <h2 className="text-5xl md:text-7xl font-bold text-[#fbfaf8] mb-4 tracking-tight drop-shadow-2xl">
                Equipamento <br/> <span className="gold-gradient-text">de Elite</span>
              </h2>
              <p className="text-xl text-[#fbfaf8]/80 max-w-md font-medium drop-shadow-md">
                Lentes de alta performance que capturam cada nuance, textura e cor, entregando uma qualidade inquestionável.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Overlay 3: O Resultado (Aligned Right) */}
        <motion.div 
          style={{ opacity: overlay3Opacity, y: overlay3Y }}
          className="absolute inset-0 z-20 flex flex-col items-end justify-center pointer-events-none px-8 lg:px-32"
        >
          <div className="w-full max-w-[350px] flex flex-col items-end text-right">
            <div className="bg-transparent backdrop-blur-md border border-[#fbfaf8]/10 p-8 rounded-2xl flex flex-col items-end">
              <ImageIcon className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#fbfaf8] mb-4 tracking-tight">
                O Resultado
              </h2>
              <p className="text-xs md:text-sm text-[#fbfaf8]/70 mb-8 font-medium">
                Arte entregue em sua mais pura forma. Uma narrativa visual que fala diretamente com o seu público-alvo.
              </p>
              <button 
                className="pointer-events-auto px-6 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Obras
              </button>
            </div>
          </div>
        </motion.div>
        
        </motion.div>

      </div>
    </section>
  );
}
