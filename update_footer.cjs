const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const footerRegex = /export function Footer\(\) \{[\s\S]*?\}\n/m;

const newFooter = `export function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream border-t border-brand-black/10 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-brand-yellow/5"></div>
      
      <div className="max-w-[1400px] mx-auto pt-20 pb-8 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 shrink-0 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 border-t-[#D4AF37] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"></div>
                <div className="absolute inset-1 rounded-full bg-brand-cream flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow duration-300">
                  <Camera className="text-[#D4AF37] w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 text-[#D4AF37] w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bodoni font-bold tracking-[0.15em] uppercase text-brand-cream leading-none">
                  DETALHES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]">ART</span>
                </span>
                <span className="text-[7.5px] lg:text-[8px] font-bold tracking-[0.3em] uppercase text-brand-cream/50 mt-1.5">Fotógrafa</span>
              </div>
            </div>
            <p className="text-sm text-brand-cream/60 leading-relaxed max-w-sm">
              Eternizando momentos e elevando a imagem da sua marca através de uma fotografia autêntica, elegante e focada em resultados. Produção de alto nível em Passo Fundo e região.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs">Navegação</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-brand-cream/70">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors">Início</button></li>
              <li><button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors">Portfólio</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors">Planos & Valores</button></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors">O Conceito</button></li>
              <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors">Dúvidas Frequentes</button></li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs">Contato & Base</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-brand-cream/70">
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-1">WhatsApp</span>
                <span className="text-brand-cream">+55 11 9999-9999</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-1">E-mail</span>
                <span className="text-brand-cream">contato@detalhesart.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-1">Localização</span>
                <span className="text-brand-cream">Passo Fundo, RS<br/>Disponível para viagens</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social & Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs">Acompanhe</h4>
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              Siga no Instagram para ver os bastidores, ensaios recentes e atualizações diárias.
            </p>
            <a 
              href="https://www.instagram.com/detalhes_artt?igsh=MWF4bzhuMjg2ajd5Mw%3D%3D&igsi=MWF4bzhuMjg2ajd5Mw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-fit flex items-center gap-3 px-6 py-3 border border-brand-yellow/30 rounded-full text-brand-yellow hover:bg-brand-yellow hover:text-brand-black transition-colors text-xs font-bold uppercase tracking-widest"
            >
              @detalhes_artt
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-brand-cream/40 font-medium tracking-widest uppercase text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} DETALHES ART FOTOGRAFIA. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-yellow transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-yellow transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

code = code.replace(footerRegex, newFooter);

fs.writeFileSync('src/components/Navigation.tsx', code);
