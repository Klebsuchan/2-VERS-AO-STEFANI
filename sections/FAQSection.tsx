import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Como funciona o processo de orçamento?",
    answer: "Meu processo é consultivo. Após receber seu contato, agendo uma rápida reunião de alinhamento para entender o escopo do projeto, quantidade de diárias, necessidades de produção (casting, locação, arte) e entregáveis. Com base nisso, envio uma proposta comercial detalhada em até 24 horas."
  },
  {
    question: "Qual é o prazo médio para entrega do material final?",
    answer: "O prazo varia conforme a complexidade do projeto. Para campanhas padrão, entregamos a primeira seleção de fotos tratadas em 5 a 7 dias úteis após o ensaio. Para vídeos e filmes comerciais, o primeiro corte (rough cut) é apresentado em até 10 dias úteis."
  },
  {
    question: "Vocês realizam produções fora de Passo Fundo?",
    answer: "Sim! Embora minha base principal seja em Passo Fundo (RS), tenho disponibilidade (com minha equipe) para viajar por todo o Brasil e exterior. Os custos de logística (deslocamento, hospedagem e alimentação da equipe) são calculados e inclusos de forma transparente no orçamento final."
  },
  {
    question: "Você providencia modelos, maquiadores e styling?",
    answer: "Sim, oferecemos produção executiva completa. Temos uma rede de parceiros premium, incluindo agências de modelos, stylists, cenógrafos e beauty artists. Você pode optar por fechar um pacote completo (turnkey) onde gerenciamos toda a equipe, ou apenas a contratação de foto/vídeo."
  },
  {
    question: "Quais são as regras de direitos de uso de imagem?",
    answer: "Por padrão, meus orçamentos de campanha incluem cessão de direitos de uso comercial para meios digitais (site, redes sociais e tráfego pago) por 12 meses. Para uso em mídia impressa, out-of-home (outdoors), TV ou direitos vitalícios (buyout total), os valores são negociados separadamente."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-cream py-20 md:py-32 text-brand-black border-t border-brand-red/10 overflow-hidden relative perspective-1000">
      
      {/* 3D Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,40,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,40,0,0.5) 1px, transparent 1px)', backgroundSize: '100px 100px', transform: 'perspective(1000px) rotateX(70deg) translateY(-200px) translateZ(-300px)' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Side - Large Atmospheric Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] lg:h-[750px] rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(255,40,0,0.1)] hidden lg:block transform-style-3d group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent z-10 pointer-events-none opacity-60"></div>
          <div className="absolute inset-0 border-2 border-brand-red/20 rounded-[3rem] z-20 pointer-events-none group-hover:border-brand-red/40 transition-colors duration-500"></div>
          <img 
            src="/imsgensfoto_4.jpeg?v=2" 
            alt="Bastidores Estúdio" 
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
          />
          <div className="absolute bottom-10 left-10 z-20 bg-brand-cream-dark/80 backdrop-blur-xl border border-brand-red/30 px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] max-w-[80%] transform-style-3d group-hover:translate-z-10 transition-transform duration-700">
             <span className="font-bold text-xs tracking-[0.2em] uppercase text-brand-red mb-2 block drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Transparência</span>
             <p className="text-sm font-medium text-brand-black/80 leading-relaxed">Cada projeto é conduzido com extrema clareza e profissionalismo, do briefing à entrega.</p>
          </div>
        </motion.div>

        {/* Right Side - FAQ Content */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-4 block drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Ficou alguma dúvida?</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-brand-cream to-brand-cream/50">PERGUNTAS FREQUENTES</h2>
            <p className="text-brand-black/60 text-lg font-medium">Tudo o que você precisa saber sobre a experiência Detalhes Art.</p>
          </motion.div>

          <div className="space-y-4 perspective-1000">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  key={index} 
                  className={`border rounded-[1.5rem] overflow-hidden transition-all duration-500 transform-style-3d ${
                    isOpen ? 'border-brand-red bg-brand-red/10 shadow-[0_10px_40px_rgba(255,40,0,0.15)] scale-[1.02] z-10 relative backdrop-blur-md' : 'border-brand-cream/10 bg-brand-cream-dark/60 hover:border-brand-red/40 hover:bg-brand-red/5 backdrop-blur-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-6 focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-brand-black drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-brand-black/80 group-hover:text-brand-black'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner ${isOpen ? 'bg-brand-red text-brand-black shadow-[0_0_15px_rgba(255,40,0,0.6)] scale-110' : 'bg-brand-cream/10 text-brand-black/50 group-hover:bg-brand-red/20 group-hover:text-brand-red'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-brand-black/60 leading-relaxed text-base md:text-lg font-medium border-t border-brand-red/10 mt-4 pt-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
