import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Video, User, Clock, Calendar, Sparkles, Check, Send } from 'lucide-react';
import { StaggeredText } from '../components/StaggeredText';

const SERVICES = [
  { id: 'portrait', name: 'Retratos & Pessoal', price: 325, icon: User },
  { id: 'product', name: 'Fotografia de Produto', price: 350, icon: Camera },
  { id: 'fashion', name: 'Campanha & Editorial', price: 380, icon: Sparkles },
];

const DURATIONS = [
  { id: '4h', name: 'Pocket (4 Horas)', multiplier: 4, icon: Clock },
  { id: '6h', name: 'Standard (6 Horas)', multiplier: 6, icon: Sparkles },
  { id: '8h', name: 'Full Day (8 Horas)', multiplier: 8, icon: Calendar },
];

const EXTRAS = [
  { id: 'edicao_fotos', name: 'Edição de Fotos', price: 650, type: 'fixed' },
  { id: 'video_gravacao', name: 'Cobertura em Vídeo', price: 1200, type: 'fixed' },
  { id: 'video_edicao', name: 'Edição de Vídeo', price: 850, type: 'fixed' },
  { id: 'expressa', name: 'Entrega Expressa (+25%)', price: 0.25, type: 'percentage' },
];

export function BudgetBuilderSection() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const base = selectedService.price * selectedDuration.multiplier;
    
    // Fixed extras total
    const fixedExtrasTotal = selectedExtras.reduce((acc, extraId) => {
      const extra = EXTRAS.find(e => e.id === extraId);
      return acc + (extra && extra.type === 'fixed' ? extra.price : 0);
    }, 0);
    
    const subtotal = base + fixedExtrasTotal;
    
    // Express delivery percentage logic
    const hasExpress = selectedExtras.includes('expressa');
    const hasEditing = selectedExtras.includes('edicao_fotos');
    
    let total = subtotal;
    if (hasExpress && hasEditing) {
      total += subtotal * 0.25;
    }
    
    return total;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleWhatsApp = () => {
    const extrasNames = selectedExtras.map(id => EXTRAS.find(e => e.id === id)?.name).join(', ') || 'Nenhum';
    const text = `Olá Detalhes Art! Gostaria de iniciar um projeto premium:\n\n*1. Serviço:* ${selectedService.name}\n*2. Duração:* ${selectedDuration.name}\n*3. Adicionais:* ${extrasNames}\n\n*Investimento Estimado:* ${formatCurrency(calculateTotal())}\n\nPodemos agendar uma reunião?`;
    
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-32 bg-brand-cream text-brand-black border-t border-brand-red/10 relative overflow-hidden perspective-1000">
      
      {/* 3D Atmosphere */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-red/5 via-brand-black to-brand-black z-0 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-bold uppercase tracking-widest text-xs mb-4 inline-block px-4 py-1 border border-brand-red/30 rounded-full bg-brand-red/10 shadow-[0_0_15px_rgba(255,40,0,0.2)]">Simulador 3D</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-cream to-brand-cream/50">
            <StaggeredText text="MONTE SEU ORÇAMENTO" />
          </h2>
          <p className="text-brand-black/60 text-lg max-w-2xl mx-auto font-medium">Selecione as necessidades do seu projeto visual e obtenha uma estimativa instantânea. Uma experiência premium desenhada para você.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Services */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-brand-black">
                <span className="w-8 h-8 rounded-full bg-brand-red text-brand-black shadow-[0_0_15px_rgba(255,40,0,0.5)] flex items-center justify-center text-sm">1</span>
                Qual o serviço principal?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SERVICES.map(service => {
                  const Icon = service.icon;
                  const isActive = selectedService.id === service.id;
                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-4 transform-style-3d ${
                        isActive 
                          ? 'border-brand-red bg-brand-red/10 shadow-[0_0_30px_rgba(255,40,0,0.2)]' 
                          : 'border-brand-cream/10 bg-brand-cream-dark/60 hover:border-brand-red/50 backdrop-blur-md'
                      }`}
                    >
                      <Icon className={isActive ? 'text-brand-red' : 'text-brand-black/70'} size={32} />
                      <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-brand-black' : 'text-brand-black/70'}`}>{service.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* 2. Duration */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-brand-black">
                <span className="w-8 h-8 rounded-full bg-brand-red text-brand-black shadow-[0_0_15px_rgba(255,40,0,0.5)] flex items-center justify-center text-sm">2</span>
                Tempo Estimado de Produção
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DURATIONS.map(duration => {
                  const Icon = duration.icon;
                  const isActive = selectedDuration.id === duration.id;
                  return (
                    <motion.button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration)}
                      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-4 transform-style-3d ${
                        isActive 
                          ? 'border-brand-red bg-brand-red/10 shadow-[0_0_30px_rgba(255,40,0,0.2)]' 
                          : 'border-brand-cream/10 bg-brand-cream-dark/60 hover:border-brand-red/50 backdrop-blur-md'
                      }`}
                    >
                      <Icon className={isActive ? 'text-brand-red' : 'text-brand-black/70'} size={32} />
                      <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-brand-black' : 'text-brand-black/70'}`}>{duration.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* 3. Extras */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-brand-black">
                <span className="w-8 h-8 rounded-full bg-brand-red text-brand-black shadow-[0_0_15px_rgba(255,40,0,0.5)] flex items-center justify-center text-sm">3</span>
                Serviços Adicionais (Opcional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXTRAS.map(extra => {
                  const isActive = selectedExtras.includes(extra.id);
                  return (
                    <motion.button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group transform-style-3d ${
                        isActive 
                          ? 'border-brand-red bg-brand-red/10 shadow-[0_0_20px_rgba(255,40,0,0.15)]' 
                          : 'border-brand-cream/10 bg-brand-cream-dark/60 hover:border-brand-red/40 backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors shadow-inner ${
                          isActive ? 'bg-brand-red border-brand-red text-brand-black' : 'border-brand-cream/20 text-transparent'
                        }`}>
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-brand-black' : 'text-brand-black/70'}`}>{extra.name}</span>
                      </div>
                      <span className="text-xs text-brand-black/50 font-bold tracking-wider">
                        {extra.type === 'percentage' ? (selectedExtras.includes('edicao_fotos') ? '+25%' : 'S/ Custo extra') : '+' + formatCurrency(extra.price)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 perspective-1000">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              className="bg-brand-cream-dark/80 backdrop-blur-2xl border-t border-l border-brand-red/30 rounded-[2rem] p-8 lg:p-10 sticky top-32 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] transform-style-3d"
            >
              <h3 className="text-lg font-bold uppercase tracking-widest text-brand-red mb-8">Resumo do Projeto</h3>
              
              <div className="space-y-6 mb-8 border-b border-brand-cream/10 pb-8 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-brand-black mb-1">Serviço Base</p>
                    <p className="text-brand-black/60">{selectedService.name}</p>
                  </div>
                  <span className="font-bold text-brand-black whitespace-nowrap">{formatCurrency(selectedService.price)}</span>
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-brand-black mb-1">Duração</p>
                    <p className="text-brand-black/60">{selectedDuration.name}</p>
                  </div>
                  <span className="font-bold text-brand-red whitespace-nowrap">x {selectedDuration.multiplier}</span>
                </div>

                {selectedExtras.length > 0 && (
                  <div className="pt-4 border-t border-brand-cream/10 space-y-4">
                    <p className="font-bold text-brand-black">Adicionais</p>
                    {selectedExtras.map(extraId => {
                      const extra = EXTRAS.find(e => e.id === extraId);
                      if (!extra) return null;
                      return (
                        <div key={extra.id} className="flex justify-between items-center text-brand-black/60">
                          <span>{extra.name}</span>
                          <span className="font-bold text-brand-black">
                            {extra.type === 'percentage' 
                              ? (selectedExtras.includes('edicao_fotos') ? '+25%' : 'Grátis (Sem edição)')
                              : formatCurrency(extra.price)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <p className="text-xs text-brand-black/50 uppercase tracking-widest font-bold mb-2">Investimento Estimado</p>
                <p className="text-4xl lg:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">{formatCurrency(calculateTotal())}</p>
                <p className="text-[10px] text-brand-black/40 mt-3">*Valores sujeitos a alteração mediante briefing detalhado e especificidades do escopo.</p>
              </div>

              <button 
                onClick={handleWhatsApp}
                className="w-full bg-brand-red text-brand-black p-5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_30px_rgba(255,40,0,0.3)] hover:shadow-[0_0_50px_rgba(255,40,0,0.6)] transition-shadow"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <Send size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="relative z-10">Enviar via WhatsApp</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
