import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={containerRef} className="bg-brand-cream py-20 md:py-32 text-brand-black overflow-hidden relative perspective-1000 border-t border-brand-red/10">
      {/* Dynamic light accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50, rotateY: 10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] transform-style-3d group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none opacity-50"></div>
          <div className="absolute inset-0 border-2 border-brand-red/20 rounded-[2rem] z-20 pointer-events-none group-hover:border-brand-red/40 transition-colors duration-500"></div>
          
          <motion.img 
            style={{ y, scale: 1.2 }}
            src="/imsgensfoto_4.jpeg?v=2" 
            alt="Estúdio de Fotografia" 
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2000ms] ease-out"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="transform-style-3d"
        >
          <span className="gold-gradient-text font-bold uppercase tracking-[0.2em] text-xs mb-4 block drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">O Conceito</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-cream to-brand-cream/50">
            EU NÃO APENAS FOTOGRAFO.<br/>
            EU <span className="gold-gradient-text drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">VENDO O SEU PRODUTO.</span>
          </h2>
          <p className="text-brand-black/70 text-lg leading-relaxed mb-12 font-medium">
            Trabalho com fotografia comercial focada em resultados. Entendo que belas imagens não bastam; elas precisam comunicar o valor da sua marca e converter clientes. Uno direção de arte de ponta, equipamentos de cinema e um olhar publicitário aguçado.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-brand-red/20 pt-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-brand-red/20"></div>
            <div className="text-center group">
              <span className="block text-5xl font-bold gold-gradient-text mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">100+</span>
              <span className="text-brand-black/50 text-xs font-bold uppercase tracking-[0.1em]">Marcas Atendidas</span>
            </div>
            <div className="text-center group">
              <span className="block text-5xl font-bold gold-gradient-text mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">∞</span>
              <span className="text-brand-black/50 text-xs font-bold uppercase tracking-[0.1em]">Possibilidades Visuais</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
