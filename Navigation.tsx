import { useState, useEffect } from 'react';
import { Menu, X, Camera, Moon, Sun, Sparkles } from 'lucide-react';
import { DecorativeFlower } from './DecorativeFlower';

export function Header({ setView }: { setView: (view: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial dark mode state
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'PORTFÓLIO', id: 'portfolio' },
    { name: 'SERVIÇOS', id: 'services' },
    { name: 'QUEM SOU', id: 'quem-sou' },
    { name: 'SOBRE', id: 'about' },
    { name: 'CONTATO', id: 'contact' },
    { name: 'ÁREA DO CLIENTE', id: 'portal', special: true }
  ];

  const handleNav = (id: string) => {
    if (id === 'portal') {
      setView('portal');
    } else {
      setView('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-cream-dark/90 backdrop-blur-xl py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-brand-red/10' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-[1600px] mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-col shrink-0 cursor-pointer group" onClick={() => handleNav('home')}>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0 perspective-1000">
              <div className="absolute inset-0 rounded-full border border-brand-red/30 border-t-brand-red animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"></div>
              <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center shadow-[0_0_15px_rgba(255,40,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,40,0,0.6)] transition-shadow duration-300 transform-style-3d group-hover:rotate-y-12">
                <Camera className="text-brand-red w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 text-brand-red w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
            <div className="flex flex-col">
              <span className={`text-2xl lg:text-3xl font-bodoni font-bold tracking-[0.15em] uppercase hidden sm:block leading-none drop-shadow-md transition-colors ${scrolled ? 'text-brand-black' : 'text-[#fbfaf8]'}`}>
                DETALHES <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">ART</span>
              </span>
              <span className={`text-[7.5px] lg:text-[8px] font-bold tracking-[0.3em] uppercase hidden sm:block mt-1.5 transition-colors ${scrolled ? 'text-brand-black/50' : 'text-[#fbfaf8]/50'}`}>Fotógrafa</span>
            </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 font-medium text-xs tracking-widest">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={`hover:text-brand-red transition-colors uppercase ${link.special ? `bg-brand-red/10 border border-brand-red/30 px-5 py-2.5 rounded-full hover:bg-brand-red hover:text-brand-black shadow-[0_0_10px_rgba(255,40,0,0.2)] ${scrolled ? 'text-brand-black' : 'text-[#fbfaf8]'}` : (scrolled ? 'text-brand-black' : 'text-[#fbfaf8]')}`}
            >
              {link.name}
            </button>
          ))}
          
          <button 
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-full bg-brand-cream/5 hover:bg-brand-red hover:text-brand-black transition-colors ${scrolled ? 'text-brand-black' : 'text-[#fbfaf8]'}`}
            aria-label="Toggle Dark Mode"
            data-cursor="view"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => handleNav('contact')}
            className={`px-6 py-2.5 rounded-full hover:shadow-[0_0_30px_rgba(255,40,0,0.6)] transition-all duration-300 uppercase font-bold tracking-widest shadow-lg border border-brand-red/50 relative overflow-hidden group hover:scale-105 ${scrolled ? 'bg-brand-red text-brand-black' : 'bg-brand-red text-[#0d0c0b]'}`}
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out skew-x-12"></span>
            ORÇAMENTO
          </button>
        </nav>
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full bg-brand-cream/10 transition-colors ${scrolled ? 'text-brand-black' : 'text-[#fbfaf8]'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`transition-colors ${scrolled ? 'text-brand-black' : 'text-[#fbfaf8]'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
                </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-cream flex flex-col p-6 gap-6 font-medium text-sm tracking-widest shadow-2xl border-t border-brand-red/20 backdrop-blur-xl">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={`text-left uppercase ${link.special ? 'text-brand-red font-bold' : 'text-brand-black'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="bg-brand-red text-brand-black p-4 rounded-full text-center uppercase tracking-widest mt-2 font-bold shadow-[0_0_20px_rgba(255,40,0,0.5)] border border-brand-red/50 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out skew-x-12"></span>
            SOLICITAR ORÇAMENTO
          </button>
        </div>
      )}
    </header>
  );
}

export function Footer({ onOpenPolicy }: { onOpenPolicy?: (type: 'privacy' | 'terms') => void }) {
  return (
    <footer className="bg-brand-cream text-brand-black border-t border-brand-red/20 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-brand-red/5"></div>
      
      <div className="max-w-[1400px] mx-auto pt-20 pb-8 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 shrink-0 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border border-brand-red/30 border-t-brand-red animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"></div>
                <div className="absolute inset-1 rounded-full bg-brand-cream flex items-center justify-center shadow-[0_0_15px_rgba(255,40,0,0.2)] group-hover:shadow-[0_0_30px_rgba(255,40,0,0.6)] transition-shadow duration-300">
                  <Camera className="text-brand-red w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 text-brand-red w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bodoni font-bold tracking-[0.15em] uppercase text-brand-black leading-none">
                  DETALHES <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">ART</span>
                </span>
                <span className="text-[7.5px] lg:text-[8px] font-bold tracking-[0.3em] uppercase text-brand-black/50 mt-1.5">Fotógrafa</span>
              </div>
            </div>
            <p className="text-sm text-brand-black/60 leading-relaxed max-w-sm">
              Eternizando momentos e elevando a imagem da sua marca através de uma fotografia autêntica, elegante e focada em resultados. Produção de alto nível em Passo Fundo e região.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs">Navegação</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-brand-black/70">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Início</button></li>
              <li><button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Portfólio</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Planos & Valores</button></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">O Conceito</button></li>
              <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Dúvidas Frequentes</button></li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs">Contato & Base</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-brand-black/70">
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-black/40 mb-1">WhatsApp</span>
                <span className="text-brand-black">+55 11 9999-9999</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-black/40 mb-1">E-mail</span>
                <span className="text-brand-black">contato@detalhesart.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-black/40 mb-1">Localização</span>
                <span className="text-brand-black">Passo Fundo, RS</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social & Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs">Acompanhe</h4>
            <p className="text-sm text-brand-black/70 leading-relaxed">
              Siga no Instagram para ver os bastidores, ensaios recentes e atualizações diárias.
            </p>
            <a 
              href="https://www.instagram.com/detalhes_artt?igsh=MWF4bzhuMjg2ajd5Mw%3D%3D&igsi=MWF4bzhuMjg2ajd5Mw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-fit flex items-center gap-3 px-6 py-3 border border-brand-red/50 rounded-full text-brand-black shadow-[0_0_15px_rgba(255,40,0,0.2)] hover:shadow-[0_0_30px_rgba(255,40,0,0.5)] hover:bg-brand-red hover:text-brand-black transition-all text-xs font-bold uppercase tracking-widest"
            >
              @detalhes_artt
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-brand-black/40 font-medium tracking-widest uppercase text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} DETALHES ART FOTOGRAFIA. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-4">
            <button onClick={() => onOpenPolicy?.('privacy')} className="hover:text-brand-red transition-colors uppercase">Política de Privacidade</button>
            <span className="hidden sm:inline">|</span>
            <button onClick={() => onOpenPolicy?.('terms')} className="hover:text-brand-red transition-colors uppercase">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
