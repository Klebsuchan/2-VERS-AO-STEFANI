import { RoundCarousel } from '../components/RoundCarousel';
import { motion } from 'motion/react';

const BTS_PHOTOS = [
  { id: 1, img: '/imsgensfoto_1.jpeg?v=2', caption: 'DIREÇÃO DE ARTE' },
  { id: 2, img: '/imsgensfoto_2.jpeg?v=2', caption: 'EQUIPAMENTOS DE CINEMA' },
  { id: 3, img: '/imsgensfoto_3.jpeg?v=2', caption: 'MONITORAMENTO' },
  { id: 4, img: '/imsgensfoto_4.jpeg?v=2', caption: 'MINHA ESTRUTURA' },
  { id: 5, img: '/imsgensfoto_9.jpeg?v=2', caption: 'LENTES PRIME' },
  { id: 6, img: '/imsgensfoto_8.jpeg?v=2', caption: 'BASE PASSO FUNDO' },
];

export function BehindTheScenesSection() {
  return (
    <section className="bg-brand-cream py-20 md:py-32 text-brand-black border-t border-brand-red/10 overflow-hidden relative perspective-1000">
      
      {/* 3D Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,40,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,40,0,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mb-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4 transform-style-3d"
        >
          <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs border border-brand-red/30 bg-brand-red/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(255,40,0,0.2)] drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Experiência</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-cream to-brand-cream/50">OS BASTIDORES</h2>
          <p className="text-brand-black/60 text-lg max-w-xl font-medium">A estrutura premium e a magia visual que acontecem por trás das câmeras. Explore a galeria em 3D.</p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full relative z-0 transform-style-3d"
      >
        {/* Adiciona um brilho vermelho super sutil ao fundo do carrossel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 blur-[150px] rounded-full -z-10 pointer-events-none mix-blend-screen"></div>
        <RoundCarousel items={BTS_PHOTOS} />
      </motion.div>
    </section>
  );
}
