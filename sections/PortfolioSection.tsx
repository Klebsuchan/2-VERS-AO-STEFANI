import { useState, useMemo } from 'react';
import { CoverflowGallery } from '../components/CoverflowGallery';
import { motion, AnimatePresence } from 'motion/react';
import { StaggeredText } from '../components/StaggeredText';

const ALL_PROJECTS = [
  { id: 1, title: 'Retratos Femininos', category: 'Ensaios', description: 'Ensaio combinando a força dos retratos femininos com a serenidade de uma paisagem ao fundo.', img: '/fotosgaleria_1.jpeg?v=2' },
  { id: 2, title: 'Luz e Textura', category: 'Ensaios', description: 'Uma imagem rica em detalhes que convida o olhar a ler e descrever cada emoção capturada.', img: '/fotosgaleria_2.jpeg?v=2' },
  { id: 3, title: 'Fachada Comercial', category: 'Comercial', description: 'Fotografia de arquitetura destacando a estrutura de um prédio e a fachada de um estabelecimento comercial.', img: '/fotosgaleria_3.jpeg?v=2' },
  { id: 4, title: 'Cenários Naturais', category: 'Ensaios', description: 'O registro poético de uma paisagem bonita, onde a luz do sol revela a grandeza e tranquilidade da natureza.', img: '/fotosgaleria_4.jpeg?v=2' },
  { id: 5, title: 'Perfil Corporativo', category: 'Comercial', description: 'Retratos corporativos diferenciados, realizados ao ar livre em uma bela estrada cercada por muitas árvores.', img: '/fotosgaleria_5.jpeg?v=2' },
  { id: 6, title: 'Casamento no Campo', category: 'Casamentos', description: 'Cerimônia ao ar livre com um clima rústico, rodeada por paisagens naturais.', img: '/fotosgaleria_6.jpeg?v=2' },
  { id: 7, title: 'Editorial de Moda', category: 'Comercial', description: 'Composição criativa e conceitual, focada em tendências, texturas e estilo urbano.', img: '/fotosgaleria_7.jpeg?v=2' },
  { id: 8, title: 'Pre-Wedding', category: 'Casamentos', description: 'Sessão fotográfica do casal antes do grande dia, em um ambiente descontraído e romântico.', img: '/fotosgaleria_8.jpeg?v=2' },
  { id: 9, title: 'Produto em Estúdio', category: 'Comercial', description: 'Fotografia de still life com iluminação controlada para evidenciar detalhes do produto.', img: '/fotosgaleria_9.jpeg?v=2' },
  { id: 10, title: 'Ensaio Gestante', category: 'Ensaios', description: 'Registro sensível e poético da maternidade, celebrando a espera e a nova vida.', img: '/fotosgaleria_10.jpeg?v=2' },
  { id: 11, title: 'Casamento Clássico', category: 'Casamentos', description: 'Registro elegante e tradicional, capturando a sofisticação da cerimônia e da recepção.', img: '/fotosgaleria_11.jpeg?v=2' },
  { id: 12, title: 'Eventos Corporativos', category: 'Comercial', description: 'Cobertura de palestras e eventos de negócios, focada em networking e momentos-chave.', img: '/fotosgaleria_12.jpeg?v=2' },
];

const FILTERS = ['Todos', 'Casamentos', 'Ensaios', 'Comercial'];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return ALL_PROJECTS;
    return ALL_PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="bg-[#0d0c0b] py-32 md:py-48 text-[#fbfaf8] overflow-hidden relative">
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-between px-6 lg:px-24">
        <div className="w-px h-full bg-[#fbfaf8]" />
        <div className="w-px h-full bg-[#fbfaf8] hidden md:block" />
        <div className="w-px h-full bg-[#fbfaf8]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-24 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12"
        >
          <div className="max-w-2xl">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Obras & Arquivos</p>
            <h2 className="text-[50px] md:text-[80px] font-black tracking-tighter leading-[0.9] uppercase">
              <StaggeredText text="Portfólio" />
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 border-b-2 ${
                  activeFilter === filter 
                    ? 'border-[#D4AF37] text-[#D4AF37]' 
                    : 'border-transparent text-[#fbfaf8]/50 hover:text-[#fbfaf8]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Gallery Container - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="w-full relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <CoverflowGallery items={filteredProjects} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
