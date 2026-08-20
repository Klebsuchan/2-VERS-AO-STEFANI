import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Camera } from 'lucide-react';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0d0c0b] overflow-hidden pt-24 pb-12 flex flex-col justify-center">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-6 lg:px-24">
        <div className="w-px h-full bg-[#fbfaf8]" />
        <div className="w-px h-full bg-[#fbfaf8] hidden md:block" />
        <div className="w-px h-full bg-[#fbfaf8]" />
      </div>

      <div className="absolute top-1/2 left-0 w-full h-px bg-[#fbfaf8] opacity-5 pointer-events-none" />

      {/* Dramatic Background Orb (like the Anxiety/Museum references) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-brand-red/20 to-[#D4AF37]/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <motion.div 
        style={{ opacity }}
        className="max-w-[1600px] w-full mx-auto px-6 lg:px-24 relative z-10 flex flex-col"
      >
        {/* Top Meta Bar */}
        <div className="w-full flex justify-between items-end border-b border-[#fbfaf8]/10 pb-6 mb-12">
          <div className="flex flex-col">
            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.3em] mb-1">Passo Fundo, RS</span>
            <span className="text-[#fbfaf8]/50 text-xs uppercase tracking-widest">Disponível para Viagens</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[#fbfaf8]/30 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="w-12 h-px bg-[#fbfaf8]/30" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 relative">
          
          {/* Left / Foreground Text */}
          <motion.div 
            style={{ y: yText }}
            className="col-span-1 lg:col-span-8 relative z-30 pt-10 lg:pt-20 pointer-events-none"
          >
            <h1 className="text-[60px] md:text-[100px] lg:text-[130px] font-black leading-[0.85] tracking-tighter text-[#fbfaf8]">
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="block">A IMAGEM</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block text-transparent" style={{ WebkitTextStroke: '2px rgba(251,250,248,0.3)' }}>DA SUA MARCA</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="block gold-gradient-text">ELEVADA.</motion.span></span>
            </h1>

            <div className="mt-16 flex flex-col md:flex-row gap-8 items-start md:items-center pointer-events-auto">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-[#fbfaf8] text-[#0d0c0b] px-10 py-5 font-bold uppercase tracking-widest text-xs transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Agendar Ensaio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
              
              <div className="max-w-xs">
                <p className="text-xs text-[#fbfaf8]/60 uppercase tracking-widest leading-loose">
                  Produção fotográfica comercial de alto nível. Uma experiência visual desenhada para elevar sua marca ao patamar premium.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right / Background Image */}
          <motion.div 
            style={{ y: yImage }}
            className="col-span-1 lg:col-span-6 lg:absolute lg:top-0 lg:right-0 lg:h-[800px] lg:w-[45vw] max-w-[700px] z-20 mt-12 lg:mt-0"
          >
            <div className="w-full h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-transparent to-transparent z-10 lg:opacity-50" />
              <img 
                src="/hero.jpg" 
                alt="Stefani - Detalhes Art Fotografia" 
                className="w-full h-full object-cover grayscale-[30%] contrast-[1.15] brightness-90 transform scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-4 h-px bg-[#D4AF37] z-20" />
              <div className="absolute top-4 left-4 w-px h-4 bg-[#D4AF37] z-20" />
              
              <div className="absolute bottom-4 right-4 w-4 h-px bg-[#D4AF37] z-20" />
              <div className="absolute bottom-4 right-4 w-px h-4 bg-[#D4AF37] z-20" />

              {/* Play Button Overlay */}
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-10 left-10 z-30 flex items-center gap-4 text-[#fbfaf8] group/btn"
              >
                <div className="w-14 h-14 rounded-full border border-[#fbfaf8]/30 flex items-center justify-center backdrop-blur-sm group-hover/btn:bg-[#fbfaf8] transition-colors duration-500">
                  <Play className="w-4 h-4 group-hover/btn:text-[#0d0c0b] ml-1 transition-colors" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Ver Portfólio</span>
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
