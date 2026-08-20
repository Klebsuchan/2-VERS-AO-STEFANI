const fs = require('fs');

const content = `import { useState } from 'react';
import { Check, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { DecorativeFlower } from '../components/DecorativeFlower';
import { StaggeredText } from '../components/StaggeredText';

export function ServicesSection() {
  const [pocketHours, setPocketHours] = useState(2);
  const baseRate = 325;

  const PACKAGES = [
    {
      id: 'short',
      name: 'Pocket Session',
      price: \`R$ \${(pocketHours * baseRate).toLocaleString('pt-BR')}\`,
      description: 'Sessão flexível e objetiva. Escolha o tempo ideal para sua necessidade.',
      features: [
        \`\${pocketHours} \${pocketHours === 1 ? 'hora' : 'horas'} de cobertura\`,
        'Fotos ilimitadas e tratadas',
        'Direção de arte e poses',
        'Brinde exclusivo',
        'Licença comercial inclusa'
      ],
      recommended: false,
      isDynamic: true,
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'standard',
      name: 'Standard Session',
      price: 'R$ 1.950',
      description: 'A experiência ideal. Tempo perfeito para múltiplas trocas de look e direção criativa refinada.',
      features: ['6 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas trocas de look', 'Brinde exclusivo impresso', 'Licença comercial inclusa'],
      recommended: true,
      isDynamic: false,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'fullday',
      name: 'Full Day Session',
      price: 'R$ 2.600',
      description: 'Diária completa de produção. O pacote definitivo para campanhas, locações múltiplas e marcas.',
      features: ['8 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas locações', 'Vídeo Teaser (Reels/TikTok)', 'Brinde VIP + Direitos totais'],
      recommended: false,
      isDynamic: false,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-cream text-brand-black relative overflow-hidden">
      
      {/* Parallax Flower - Middle Left */}
      <DecorativeFlower 
        src="/flower2.png" 
        className="-top-[5%] -left-[5%] w-72 md:w-[32rem]" 
        initialRotate={45} 
        parallaxOffset={40} 
        opacity={0.35}
        origin="top left"
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-black">
            <StaggeredText text="PLANOS DE INVESTIMENTO" />
          </h2>
          <p className="text-brand-black/70 max-w-xl mx-auto">Soluções comerciais estruturadas para atender desde lançamentos pontuais até necessidades contínuas de grandes marcas.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {PACKAGES.map((pkg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              key={pkg.id} 
              className={\`rounded-3xl flex flex-col relative transition-all duration-300 hover:-translate-y-2 \${pkg.recommended ? 'bg-brand-cream border-2 border-brand-yellow shadow-[0_20px_60px_rgba(240,165,0,0.15)] z-10 md:scale-105' : 'bg-brand-cream border border-brand-black/5 shadow-xl shadow-black/5'}\`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-black font-bold px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-lg z-20">
                  Mais Escolhido
                </div>
              )}
              
              <div className="w-full h-48 shrink-0 relative rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 bg-brand-black/10 mix-blend-multiply z-10 pointer-events-none"></div>
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <p className="text-brand-black/70 text-sm mb-8 flex-1 leading-relaxed">{pkg.description}</p>
                
                <div className="mb-8 pb-8 border-b border-brand-black/10">
                  <span className="text-4xl font-bold text-brand-black">{pkg.price}</span>
                  {pkg.isDynamic && (
                    <div className="flex items-center justify-between bg-brand-cream-dark/50 p-2 rounded-xl mt-4 border border-brand-black/5">
                      <button onClick={() => setPocketHours(Math.max(1, pocketHours - 1))} className="p-3 hover:bg-brand-black/10 rounded-lg text-brand-black transition-colors"><Minus size={16} /></button>
                      <span className="font-bold text-sm tracking-wider uppercase text-brand-black/80">{pocketHours} {pocketHours === 1 ? 'Hora' : 'Horas'}</span>
                      <button onClick={() => setPocketHours(Math.min(10, pocketHours + 1))} className="p-3 hover:bg-brand-black/10 rounded-lg text-brand-black transition-colors"><Plus size={16} /></button>
                    </div>
                  )}
                </div>

                <ul className="space-y-4 text-sm text-brand-black/80 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 shrink-0 text-brand-yellow" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={\`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors mt-auto \${pkg.recommended ? 'bg-brand-yellow text-black hover:bg-brand-black hover:text-brand-cream' : 'bg-brand-black/5 text-brand-black hover:bg-brand-black hover:text-brand-cream'}\`}>
                  Selecionar Pacote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/sections/ServicesSection.tsx', content);
