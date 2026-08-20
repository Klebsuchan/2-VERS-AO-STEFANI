import fs from 'fs';

const files = {
  'src/index.css': `@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

@theme {
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --color-brand-yellow: #FFCC00;
  --color-brand-black: #050505;
  --color-brand-dark: #121212;
}

body {
  background-color: var(--color-brand-black);
  color: #FFFFFF;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-brand-black); }
::-webkit-scrollbar-thumb { background: #333333; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-brand-yellow); }
`,

  'src/App.tsx': `import { useState } from 'react';
import { Header, Footer } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { ClientSection } from './sections/ClientSection';
import { ClientPortal } from './sections/ClientPortal';

export default function App() {
  const [view, setView] = useState('home');
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-yellow selection:text-black">
      <Header setView={setView} />
      {view === 'home' && (
        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <AboutSection />
          <ClientSection />
        </main>
      )}
      {view === 'portal' && (
        <main className="pt-24">
          <ClientPortal setView={setView} />
        </main>
      )}
      <Footer />
    </div>
  );
}`,

  'src/components/Navigation.tsx': `import { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';

export function Header({ setView }: { setView: (view: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PORTFÓLIO', id: 'portfolio' },
    { name: 'SERVIÇOS', id: 'services' },
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
    <header className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}\`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
          <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-black group-hover:scale-105 transition-transform">
            <Camera size={20} weight="fill" />
          </div>
          <span className="text-xl font-bold tracking-widest uppercase text-white">LUMIÈRE</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 font-medium text-xs tracking-widest">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={\`hover:text-brand-yellow transition-colors uppercase \${link.special ? 'bg-white/10 px-5 py-2.5 rounded-full hover:bg-brand-yellow hover:text-black' : 'text-white'}\`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="bg-brand-yellow text-black px-6 py-2.5 rounded-full hover:bg-white transition-colors uppercase font-bold tracking-widest"
          >
            ORÇAMENTO
          </button>
        </nav>

        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-dark flex flex-col p-6 gap-6 font-medium text-sm tracking-widest shadow-2xl">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={\`text-left uppercase \${link.special ? 'text-brand-yellow' : 'text-white'}\`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="bg-brand-yellow text-black p-4 rounded-full text-center uppercase tracking-widest mt-2 font-bold"
          >
            SOLICITAR ORÇAMENTO
          </button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-20 px-8 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-black">
              <Camera size={20} />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase text-white">LUMIÈRE</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fotografia comercial e filmes de alto impacto para marcas que exigem excelência visual e resultados reais.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-brand-yellow uppercase tracking-widest mb-6 text-xs">Menu</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#portfolio" className="hover:text-brand-yellow transition-colors">Portfólio</a></li>
            <li><a href="#services" className="hover:text-brand-yellow transition-colors">Serviços</a></li>
            <li><a href="#about" className="hover:text-brand-yellow transition-colors">Sobre o Estúdio</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-brand-yellow uppercase tracking-widest mb-6 text-xs">Redes Sociais</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Behance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-brand-yellow uppercase tracking-widest mb-6 text-xs">Contato</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li>contato@lumiere.art</li>
            <li>+55 11 9999-9999</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto border-t border-white/10 mt-16 pt-8 text-[10px] text-gray-500 uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
        <span>&copy; {new Date().getFullYear()} LUMIÈRE STUDIOS. TODOS OS DIREITOS RESERVADOS.</span>
        <span>CNPJ: 00.000.000/0001-00</span>
      </div>
    </footer>
  );
}
`,

  'src/sections/HeroSection.tsx': `export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-brand-black flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/20 to-brand-black"></div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16">
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
      </div>
    </section>
  );
}
`,

  'src/sections/ServicesSection.tsx': `import { Check } from 'lucide-react';

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
        <div className="text-center mb-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">PLANOS DE INVESTIMENTO</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Soluções comerciais estruturadas para atender desde lançamentos pontuais até necessidades contínuas de grandes marcas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={\`rounded-3xl p-8 lg:p-10 flex flex-col relative transition-all duration-300 hover:-translate-y-2 \${pkg.recommended ? 'bg-brand-dark border border-brand-yellow shadow-[0_0_40px_rgba(255,204,0,0.15)] z-10 md:scale-105' : 'bg-brand-dark/50 border border-white/5'}\`}>
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
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 text-brand-yellow" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors \${pkg.recommended ? 'bg-brand-yellow text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'}\`}>
                Selecionar Pacote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/PortfolioSection.tsx': `export function PortfolioSection() {
  const projects = [
    { title: 'Campanha Nike Air', category: 'PRODUTO / COMERCIAL', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80' },
    { title: 'Vogue Primavera', category: 'MODA / EDITORIAL', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80' },
    { title: 'Coleção Tech Wear', category: 'LIFESTYLE', img: 'https://images.unsplash.com/photo-1523398002811-999aa8e9ddaa?w=1000&q=80' },
    { title: 'Luxo em Detalhes', category: 'JOALHERIA', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&q=80' },
    { title: 'Retratos Urbanos', category: 'CAMPANHA', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=80' },
    { title: 'Beleza Natural', category: 'COSMÉTICOS', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80' }
  ];

  return (
    <section id="portfolio" className="bg-brand-dark py-32 text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">NOSSO PORTFÓLIO</h2>
            <p className="text-gray-400 text-lg">Um olhar sobre nossos projetos comerciais mais recentes.</p>
          </div>
          <button className="bg-transparent text-white border border-white/20 hover:border-brand-yellow hover:text-brand-yellow px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-colors">
            Ver Arquivo Completo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-black cursor-pointer">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-brand-yellow font-bold uppercase tracking-widest text-[10px] mb-2 drop-shadow-md">{p.category}</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/AboutSection.tsx': `export function AboutSection() {
  return (
    <section id="about" className="bg-brand-black py-32 text-white">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1554046920-90dcac824ab8?w=1000&q=80" 
            alt="Estúdio de Fotografia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-yellow mix-blend-overlay opacity-20"></div>
        </div>
        <div>
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
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/ClientSection.tsx': `export function ClientSection() {
  return (
    <section id="contact" className="py-32 bg-brand-dark text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-brand-black p-10 md:p-16 lg:p-24 rounded-[3rem] border border-white/10 shadow-2xl">
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
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/ClientPortal.tsx': `import { Lock } from 'lucide-react';

export function ClientPortal({ setView }: { setView: (view: string) => void }) {
  return (
    <section className="min-h-[80vh] bg-brand-black text-white flex flex-col justify-center items-center p-6 relative">
      <div className="relative z-10 w-full max-w-lg bg-brand-dark rounded-3xl p-10 md:p-14 border border-white/10 shadow-2xl">
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
      </div>
    </section>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content, 'utf8');
}
