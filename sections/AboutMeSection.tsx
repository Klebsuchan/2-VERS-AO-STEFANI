import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { StaggeredText } from '../components/StaggeredText';

export function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="quem-sou" ref={containerRef} className="bg-brand-cream py-32 md:py-48 text-brand-black overflow-hidden relative border-t border-brand-black/10">
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-6 lg:px-24">
        <div className="w-px h-full bg-brand-black" />
        <div className="w-px h-full bg-brand-black hidden md:block" />
        <div className="w-px h-full bg-brand-black" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start relative z-10">
        
        {/* Text Column */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col pt-12 lg:pt-24 lg:pr-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-bold uppercase tracking-[0.3em] text-[10px] text-brand-black/60">A Artista</span>
          </div>
          
          <h2 className="text-[50px] md:text-[80px] font-black tracking-tighter leading-[0.9] mb-12 uppercase">
            <StaggeredText text="A Essência" /> <br/>
            <span className="text-transparent stroke-text italic font-bodoni lowercase" style={{ WebkitTextStroke: '1px var(--color-brand-black)' }}>
              do olhar
            </span>
          </h2>
          
          <div className="pl-6 border-l border-brand-black/20">
            <p className="text-brand-black/80 text-lg md:text-xl leading-relaxed mb-8 font-medium">
              Muito prazer, eu sou Stefani, fundadora da Detalhes Art. Sou uma fotógrafa apaixonada pela arte de eternizar a essência de marcas e pessoas. Acredito que cada clique deve carregar uma história, uma textura e uma emoção palpável.
            </p>
            <p className="text-brand-black/80 text-lg md:text-xl leading-relaxed mb-12 font-medium">
              Minha missão é trazer um olhar sofisticado para projetos fotográficos. Com um estilo que mistura o minimalismo contemporâneo com uma estética atemporal, minha luz busca sempre a verdade e a melhor versão de cada projeto.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 pt-12 border-t border-brand-black/10">
            <div>
              <span className="block font-black text-5xl mb-2">7+</span>
              <span className="block font-bold text-[10px] tracking-widest uppercase text-brand-black/50">Anos no Mercado</span>
            </div>
            
            <div className="w-px bg-brand-black/10 hidden sm:block" />
            
            <div>
              <span className="block font-black text-5xl mb-2 text-[#D4AF37]">100+</span>
              <span className="block font-bold text-[10px] tracking-widest uppercase text-brand-black/50">Projetos Executados</span>
            </div>
          </div>
        </motion.div>

        {/* Image Collage Column */}
        <div className="lg:col-span-6 relative h-[600px] lg:h-[800px] w-full mt-12 lg:mt-0">
          {/* Main Large Image */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[85%] h-[75%] overflow-hidden bg-brand-black"
          >
            <img 
              src="/imsgensfoto_1.jpeg?v=2" 
              alt="Retrato da Fotógrafa Principal" 
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </motion.div>

          {/* Secondary Image - Bottom Left overlapping */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-[55%] h-[55%] overflow-hidden bg-brand-black border-4 border-brand-cream z-20 shadow-2xl"
          >
            <img 
              src="/imsgensfoto_2.jpeg?v=2" 
              alt="Detalhe de Câmera" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Golden Accent Box */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#D4AF37]/50 mix-blend-multiply z-10 hidden md:block" />
        </div>
      </div>
    </section>
  );
}
