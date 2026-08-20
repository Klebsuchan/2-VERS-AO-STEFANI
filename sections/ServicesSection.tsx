import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Plus, Minus, ArrowRight } from 'lucide-react';
import { StaggeredText } from '../components/StaggeredText';
import { ScrollReveal } from '../components/ScrollReveal';

export function ServicesSection() {
  const [pocketHours, setPocketHours] = useState(2);
  const baseRate = 325;

  const PACKAGES = [
    {
      id: 'short',
      name: 'Pocket Session',
      price: `R$ ${(pocketHours * baseRate).toLocaleString('pt-BR')}`,
      description: 'Sessão flexível e objetiva. Escolha o tempo ideal para sua necessidade.',
      features: [
        `${pocketHours} ${pocketHours === 1 ? 'hora' : 'horas'} de cobertura`,
        'Fotos ilimitadas e tratadas',
        'Direção de arte e poses',
        'Brinde exclusivo',
        'Licença comercial inclusa'
      ],
      recommended: false,
      isDynamic: true,
      image: '/imsgensfoto_5.jpeg?v=2'
    },
    {
      id: 'standard',
      name: 'Standard Session',
      price: 'R$ 1.950',
      description: 'A experiência ideal. Tempo perfeito para múltiplas trocas de look e direção criativa refinada.',
      features: ['6 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas trocas de look', 'Brinde exclusivo impresso', 'Licença comercial inclusa'],
      recommended: true,
      isDynamic: false,
      image: '/imsgensfoto_6.jpeg?v=2'
    },
    {
      id: 'fullday',
      name: 'Full Day Session',
      price: 'R$ 2.600',
      description: 'Diária completa de produção. O pacote definitivo para campanhas, locações múltiplas e marcas.',
      features: ['8 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas locações', 'Vídeo Teaser (Reels/TikTok)', 'Brinde VIP + Direitos totais'],
      recommended: false,
      isDynamic: false,
      image: '/imsgensfoto_11.jpeg?v=2'
    }
  ];

  return (
    <section id="services" className="py-32 bg-brand-cream text-brand-black relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-24 relative z-10">
        
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[50px] md:text-[80px] font-black tracking-tighter leading-[0.9] mb-8 uppercase">
              <StaggeredText text="Investimento" /> <br/>
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--color-brand-black)' }}>
                Na Sua Imagem
              </span>
            </h2>
            <p className="text-brand-black/60 text-lg md:text-xl font-medium max-w-md">
              Soluções visuais premium estruturadas para elevar a presença da sua marca ao patamar que ela merece.
            </p>
          </div>
          <div className="hidden lg:block w-32 h-px bg-brand-black/20" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-brand-black/10">
          {PACKAGES.map((pkg, i) => (
            <motion.div 
              key={pkg.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col relative border-b lg:border-b-0 lg:border-r border-brand-black/10 p-8 lg:p-12 hover:bg-brand-black/5 transition-colors duration-500 ${i === PACKAGES.length - 1 ? 'lg:border-r-0' : ''}`}
            >
              {pkg.recommended && (
                <div className="absolute top-8 right-8 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  Standard
                </div>
              )}
              
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-4 font-bold">0{i + 1}</p>
                <h3 className="text-3xl font-bold mb-4 font-bodoni italic pr-12">{pkg.name}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed min-h-[60px]">{pkg.description}</p>
              </div>
              
              <div className="mb-12">
                <span className="text-4xl md:text-5xl font-black tracking-tighter">{pkg.price}</span>
                {pkg.isDynamic && (
                  <div className="flex items-center gap-4 mt-6">
                    <button onClick={() => setPocketHours(Math.max(1, pocketHours - 1))} className="w-10 h-10 rounded-full border border-brand-black/20 flex items-center justify-center hover:border-brand-black transition-colors"><Minus size={14} /></button>
                    <span className="font-bold text-xs tracking-widest uppercase">{pocketHours} {pocketHours === 1 ? 'HR' : 'HRS'}</span>
                    <button onClick={() => setPocketHours(Math.min(10, pocketHours + 1))} className="w-10 h-10 rounded-full border border-brand-black/20 flex items-center justify-center hover:border-brand-black transition-colors"><Plus size={14} /></button>
                  </div>
                )}
              </div>
              
              <ul className="space-y-4 text-sm text-brand-black/70 mb-16 flex-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full flex items-center justify-between py-5 border-t border-brand-black/10 group-hover:border-brand-black transition-colors">
                <span className="font-bold text-xs uppercase tracking-widest">Selecionar</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
