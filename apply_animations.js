import fs from 'fs';

const files = {
  'src/sections/HeroSection.tsx': `import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-brand-black flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/20 to-brand-black"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16"
      >
        <span className="text-brand-yellow font-bold uppercase tracking-[0.4em] text-xs mb-6 inline-block px-4 py-1 border border-brand-yellow/30 rounded-full bg-brand-yellow/10">
          Estúdio de Fotografia Comercial
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold leading-[1.1] tracking-tight mb-6 text-white">
          A IMAGEM DA SUA <br/>
          MARCA <span className="text-brand-yellow">ELEVADA.</span>
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Produção fotográfica e audiovisual de alto nível para campanhas publicitárias, moda, e marcas que desejam se destacar no mercado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-yellow text-black hover:bg-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-colors w-full sm:w-auto"
          >
            Solicitar Orçamento
          </button>
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-colors w-full sm:w-auto"
          >
            Ver Portfólio
          </button>
        </div>
      </motion.div>
    </section>
  );
}
`,

  'src/sections/ServicesSection.tsx': `import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const PACKAGES = [
  {
    id: 'studio',
    name: 'Estúdio Essencial',
    price: 'R$ 2.500',
    description: 'Perfeito para e-commerce, lançamentos de produtos e retratos corporativos modernos.',
    features: ['Meia diária de estúdio', 'Direção de arte básica', '50 fotos tratadas em alta', 'Licença comercial inclusa'],
    recommended: false
  },
  {
    id: 'campaign',
    name: 'Campanha Completa',
    price: 'R$ 7.800',
    description: 'Transformação visual completa para sua próxima grande campanha ou coleção.',
    features: ['Diária completa de produção', 'Estúdio ou Locação Externa', '150+ fotos com retoque premium', 'Vídeo Teaser para Reels/TikTok', 'Cessão total de direitos'],
    recommended: true
  },
  {
    id: 'retainer',
    name: 'Retenção de Marca',
    price: 'Sob Consulta',
    description: 'Criação de conteúdo de altíssima qualidade entregue mensalmente para sua marca.',
    features: ['1 Produção por mês', 'Formatos otimizados para redes', 'Prioridade de agenda', 'Diretor de arte dedicado'],
    recommended: false
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-brand-black text-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">PLANOS DE INVESTIMENTO</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Soluções comerciais estruturadas para atender desde lançamentos pontuais até necessidades contínuas de grandes marcas.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {PACKAGES.map((pkg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              key={pkg.id} 
              className={\`rounded-3xl p-8 lg:p-10 flex flex-col relative transition-all duration-300 hover:-translate-y-2 \${pkg.recommended ? 'bg-brand-dark border border-brand-yellow shadow-[0_0_40px_rgba(255,204,0,0.15)] z-10 md:scale-105' : 'bg-brand-dark/50 border border-white/5'}\`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-black font-bold px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-lg">
                  Mais Escolhido
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-8 flex-1 leading-relaxed">{pkg.description}</p>
              <div className="mb-8 pb-8 border-b border-white/10">
                <span className="text-4xl font-bold text-white">{pkg.price}</span>
              </div>
              <ul className="space-y-4 text-sm text-gray-300 mb-10">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 text-brand-yellow" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors \${pkg.recommended ? 'bg-brand-yellow text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'}\`}>
                Selecionar Pacote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/PortfolioSection.tsx': `import { useState, useMemo } from 'react';
import { CoverflowGallery } from '../components/CoverflowGallery';
import { motion, AnimatePresence } from 'motion/react';

const ALL_PROJECTS = [
  { id: 1, title: 'Campanha de Verão', category: 'Comercial', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80' },
  { id: 2, title: 'Casamento Ana & Paulo', category: 'Casamentos', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=80' },
  { id: 3, title: 'Editorial de Moda', category: 'Ensaios', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80' },
  { id: 4, title: 'Lançamento Tech Wear', category: 'Comercial', img: 'https://images.unsplash.com/photo-1523398002811-999aa8e9ddaa?w=1000&q=80' },
  { id: 5, title: 'Casamento Júlia & Marcos', category: 'Casamentos', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80' },
  { id: 6, title: 'Retratos Corporativos', category: 'Ensaios', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80' },
  { id: 7, title: 'Joalheria Luxo', category: 'Comercial', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&q=80' },
];

const FILTERS = ['Todos', 'Casamentos', 'Ensaios', 'Comercial'];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return ALL_PROJECTS;
    return ALL_PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="bg-brand-dark py-32 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">NOSSO PORTFÓLIO</h2>
            <p className="text-gray-400 text-lg">Um olhar imersivo sobre nossos projetos mais recentes.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={\`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 border \${
                  activeFilter === filter 
                    ? 'bg-brand-yellow text-black border-brand-yellow' 
                    : 'bg-transparent text-white border-white/20 hover:border-white/50'
                }\`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full relative py-12"
      >
        <div className="absolute inset-0 bg-brand-yellow/5 skew-y-3 transform origin-bottom-left -z-10"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CoverflowGallery items={filteredProjects} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
`,

  'src/sections/BehindTheScenesSection.tsx': `import { RoundCarousel } from '../components/RoundCarousel';
import { motion } from 'motion/react';

const BTS_PHOTOS = [
  { id: 1, img: 'https://images.unsplash.com/photo-1590457635955-40742f9a2e38?w=800&q=80', caption: 'DIREÇÃO DE ARTE' },
  { id: 2, img: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80', caption: 'EQUIPAMENTOS DE CINEMA' },
  { id: 3, img: 'https://images.unsplash.com/photo-1596727289895-3bcffbc9e9d6?w=800&q=80', caption: 'MONITORAMENTO' },
  { id: 4, img: 'https://images.unsplash.com/photo-1620612668580-5b5c92842407?w=800&q=80', caption: 'NOSSA EQUIPE' },
  { id: 5, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', caption: 'LENTES PRIME' },
  { id: 6, img: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80', caption: 'ESTÚDIO VILA MADALENA' },
];

export function BehindTheScenesSection() {
  return (
    <section className="bg-brand-dark py-32 text-white border-t border-white/10 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1 rounded-full">Experiência</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">OS BASTIDORES</h2>
          <p className="text-gray-400 text-lg max-w-xl">A estrutura e a magia que acontecem por trás das câmeras. Explore nosso estúdio rotacionando a galeria.</p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full relative z-0"
      >
        {/* Adiciona um brilho amarelo super sutil ao fundo do carrossel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <RoundCarousel items={BTS_PHOTOS} />
      </motion.div>
    </section>
  );
}
`,

  'src/sections/AboutSection.tsx': `import { motion } from 'motion/react';

export function AboutSection() {
  return (
    <section id="about" className="bg-brand-black py-32 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1554046920-90dcac824ab8?w=1000&q=80" 
            alt="Estúdio de Fotografia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-yellow mix-blend-overlay opacity-20"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4 block">Sobre o Estúdio</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            NÓS NÃO APENAS FOTOGRAFAMOS.<br/>
            NÓS <span className="text-brand-yellow">VENDEMOS O SEU PRODUTO.</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12 font-light">
            Somos um estúdio de fotografia comercial focado em resultados. Entendemos que belas imagens não bastam; elas precisam comunicar o valor da sua marca e converter clientes. Unimos direção de arte de ponta, equipamentos de cinema e um olhar publicitário aguçado.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
            <div>
              <span className="block text-5xl font-bold text-brand-yellow mb-2 tracking-tighter">500+</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Campanhas Entregues</span>
            </div>
            <div>
              <span className="block text-5xl font-bold text-brand-yellow mb-2 tracking-tighter">15</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Anos de Mercado</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`,

  'src/sections/FAQSection.tsx': `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Como funciona o processo de orçamento?",
    answer: "Nosso processo é consultivo. Após recebermos seu contato, agendamos uma rápida reunião de alinhamento para entender o escopo do projeto, quantidade de diárias, necessidades de produção (casting, locação, arte) e entregáveis. Com base nisso, enviamos uma proposta comercial detalhada em até 24 horas."
  },
  {
    question: "Qual é o prazo médio para entrega do material final?",
    answer: "O prazo varia conforme a complexidade do projeto. Para campanhas padrão, entregamos a primeira seleção de fotos tratadas em 5 a 7 dias úteis após o ensaio. Para vídeos e filmes comerciais, o primeiro corte (rough cut) é apresentado em até 10 dias úteis."
  },
  {
    question: "Vocês realizam produções fora de São Paulo?",
    answer: "Sim! Embora nosso estúdio principal esteja localizado em São Paulo (Vila Madalena), nossa equipe tem disponibilidade para viajar por todo o Brasil e exterior. Os custos de logística (deslocamento, hospedagem e alimentação da equipe) são calculados e inclusos de forma transparente no orçamento final."
  },
  {
    question: "O estúdio providencia modelos, maquiadores e styling?",
    answer: "Sim, oferecemos produção executiva completa. Temos uma rede de parceiros premium, incluindo agências de modelos, stylists, cenógrafos e beauty artists. Você pode optar por fechar um pacote completo (turnkey) onde gerenciamos toda a equipe, ou apenas a contratação de foto/vídeo."
  },
  {
    question: "Quais são as regras de direitos de uso de imagem?",
    answer: "Por padrão, nossos orçamentos de campanha incluem cessão de direitos de uso comercial para meios digitais (site, redes sociais e tráfego pago) por 12 meses. Para uso em mídia impressa, out-of-home (outdoors), TV ou direitos vitalícios (buyout total), os valores são negociados separadamente."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-black py-32 text-white border-t border-white/10">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4 block">Ficou alguma dúvida?</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">PERGUNTAS FREQUENTES</h2>
          <p className="text-gray-400 text-lg">Tudo o que você precisa saber sobre como trabalhamos.</p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index} 
                className={\`border rounded-2xl overflow-hidden transition-colors duration-300 \${
                  isOpen ? 'border-brand-yellow bg-brand-dark/50' : 'border-white/10 bg-transparent hover:border-white/30'
                }\`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-6 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={\`font-bold text-lg md:text-xl transition-colors \${isOpen ? 'text-brand-yellow' : 'text-white'}\`}>
                    {faq.question}
                  </span>
                  <div className={\`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors \${isOpen ? 'bg-brand-yellow text-black' : 'bg-white/5 text-white'}\`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-400 leading-relaxed text-base md:text-lg font-light">
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
    </section>
  );
}
`,

  'src/sections/ClientSection.tsx': `import { motion } from 'motion/react';

export function ClientSection() {
  return (
    <section id="contact" className="py-32 bg-brand-dark text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-brand-black p-10 md:p-16 lg:p-24 rounded-[3rem] border border-white/10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4 block">Vamos Conversar</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                PRONTO PARA <br/><span className="text-brand-yellow">CRIAR?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12">Preencha o formulário e nossa equipe comercial entrará em contato em até 24 horas úteis com uma proposta personalizada.</p>
              
              <div className="space-y-6 font-medium text-sm border-t border-white/10 pt-10">
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span className="text-brand-yellow uppercase tracking-widest text-[10px] font-bold w-24">Email</span> 
                  <span className="text-white">contato@lumiere.art</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span className="text-brand-yellow uppercase tracking-widest text-[10px] font-bold w-24">Telefone</span> 
                  <span className="text-white">+55 11 9999-9999</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span className="text-brand-yellow uppercase tracking-widest text-[10px] font-bold w-24">Estúdio</span> 
                  <span className="text-white">Vila Madalena - São Paulo, SP</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nome / Empresa</label>
                <input type="text" className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Sua marca aqui" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Profissional</label>
                <input type="email" className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="voce@empresa.com" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Detalhes do Projeto</label>
                <textarea rows={4} className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-yellow resize-none transition-colors" placeholder="Conte-nos sobre a campanha, referências e prazos..."></textarea>
              </div>
              <button className="w-full bg-brand-yellow text-black hover:bg-white p-5 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors mt-2">
                Solicitar Orçamento
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`,

  'src/sections/ClientPortal.tsx': `import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

export function ClientPortal({ setView }: { setView: (view: string) => void }) {
  return (
    <section className="min-h-[80vh] bg-brand-black text-white flex flex-col justify-center items-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-brand-dark rounded-3xl p-10 md:p-14 border border-white/10 shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-brand-yellow/10 text-brand-yellow flex items-center justify-center rounded-full">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Área do Cliente</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Acesse suas galerias exclusivas e arquivos em alta resolução.</p>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 text-center">Código de Acesso (PIN)</label>
            <input type="password" placeholder="••••••••" className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-center text-2xl tracking-widest focus:outline-none focus:border-brand-yellow transition-colors text-white" />
          </div>
          <button className="w-full bg-brand-yellow text-black hover:bg-white p-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors">
            Acessar Galeria
          </button>
          <button 
            type="button"
            onClick={() => setView('home')}
            className="w-full bg-transparent text-gray-400 hover:text-white p-4 font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Voltar ao Site
          </button>
        </form>
      </motion.div>
    </section>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content, 'utf8');
}
