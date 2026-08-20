import { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export function ClientSection() {
  const [formData, setFormData] = useState({
    name: '',
    service: 'Fotografia de Produto',
    details: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Gostaria de um orçamento.\n\n*Nome/Empresa:* ${formData.name}\n*Serviço de Interesse:* ${formData.service}\n\n*Detalhes do Projeto:*\n${formData.details}`;
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-brand-cream text-brand-black overflow-hidden border-t border-brand-red/10 relative perspective-1000">
      
      {/* 3D Atmosphere */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-red/5 via-brand-black to-brand-black z-0 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <ScrollReveal 
          className="bg-brand-cream-dark/80 backdrop-blur-2xl rounded-[3rem] border border-brand-red/20 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col lg:flex-row transform-style-3d hover:shadow-[0_40px_80px_rgba(255,40,0,0.15)] transition-shadow duration-700"
        >
          {/* Left Side - Massive Image */}
          <div className="lg:w-5/12 relative min-h-[400px] lg:min-h-[600px] hidden sm:block group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 to-transparent z-10 pointer-events-none"></div>
            <img 
              src="/imsgensfoto_9.jpeg?v=2" 
              alt="Modelo em estúdio" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[50%] hover:grayscale-0 group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
            />
            <div className="absolute bottom-10 left-10 z-20 text-brand-black max-w-xs transform-style-3d group-hover:translate-z-10 transition-transform duration-700">
              <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Conexão Real</span>
              <p className="text-xl md:text-2xl font-heading font-bold italic leading-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-cream to-brand-cream/60 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">"A imagem certa vende antes da primeira palavra."</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-4 block drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Vamos Conversar</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-cream to-brand-cream/50">
                PRONTO PARA <br/><span className="text-brand-red drop-shadow-[0_0_15px_rgba(255,40,0,0.5)]">CRIAR?</span>
              </h2>
              <p className="text-brand-black/60 text-lg mb-10 font-medium">Preencha o formulário e inicie uma conversa diretamente comigo no WhatsApp com uma proposta inicial para elevarmos sua marca.</p>
              
              <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black/50 mb-2 group-focus-within:text-brand-red transition-colors">Nome / Empresa</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-cream/5 border border-brand-red/20 rounded-xl p-4 text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-red/5 transition-all shadow-inner" 
                      placeholder="Sua marca" 
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black/50 mb-2 group-focus-within:text-brand-red transition-colors">Serviço</label>
                    <select 
                      className="w-full bg-brand-cream/5 border border-brand-red/20 rounded-xl p-4 text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-red/5 transition-all appearance-none cursor-pointer shadow-inner"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option className="bg-brand-cream text-brand-black">Fotografia de Produto</option>
                      <option className="bg-brand-cream text-brand-black">Editorial / Moda</option>
                      <option className="bg-brand-cream text-brand-black">Filme Comercial</option>
                      <option className="bg-brand-cream text-brand-black">Retratos Corporativos</option>
                      <option className="bg-brand-cream text-brand-black">Outro Projeto Específico</option>
                    </select>
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black/50 mb-2 group-focus-within:text-brand-red transition-colors">Detalhes do Projeto</label>
                  <textarea 
                    required
                    rows={3} 
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-brand-cream/5 border border-brand-red/20 rounded-xl p-4 text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-red/5 resize-none transition-all shadow-inner" 
                    placeholder="Conte-nos sobre a campanha e prazos..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-red text-brand-black p-5 rounded-xl font-bold text-sm uppercase tracking-[0.2em] flex justify-center items-center gap-3 group relative overflow-hidden shadow-[0_0_20px_rgba(255,40,0,0.3)] hover:shadow-[0_0_40px_rgba(255,40,0,0.6)] transition-all">
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <Send size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <span className="relative z-10">Solicitar via WhatsApp</span>
                </button>
              </form>

              <div className="flex flex-wrap gap-x-8 gap-y-4 font-medium text-sm border-t border-brand-red/20 pt-8 mt-10">
                <div className="flex flex-col gap-1 group cursor-pointer">
                  <span className="text-brand-red uppercase tracking-[0.2em] text-[10px] font-bold drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Email</span> 
                  <span className="text-brand-black/80 group-hover:text-brand-black transition-colors">contato@detalhesart.com</span>
                </div>
                <div className="flex flex-col gap-1 group cursor-pointer">
                  <span className="text-brand-red uppercase tracking-[0.2em] text-[10px] font-bold drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Base</span> 
                  <span className="text-brand-black/80 group-hover:text-brand-black transition-colors">Passo Fundo, RS</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
