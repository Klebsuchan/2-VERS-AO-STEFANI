import fs from 'fs';

const files = {
  'src/index.css': `@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Montserrat:wght@800;900&display=swap');

@theme {
  --font-display: 'Montserrat', sans-serif;
  --font-sans: 'Inter', sans-serif;
  --color-brand-yellow: #FFCC00;
}

body {
  background-color: #FFFFFF;
  color: #000000;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #000000; }
::-webkit-scrollbar-thumb { background: #FFCC00; }
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
    <div className="min-h-screen bg-white text-black font-sans selection:bg-brand-yellow selection:text-black">
      <Header setView={setView} />
      {view === 'home' && (
        <main className="pt-20">
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <AboutSection />
          <ClientSection />
        </main>
      )}
      {view === 'portal' && (
        <main className="pt-20">
          <ClientPortal setView={setView} />
        </main>
      )}
      <Footer />
    </div>
  );
}`,

  'src/components/Navigation.tsx': `import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header({ setView }: { setView: (view: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: 'PORTFOLIO', id: 'portfolio' },
    { name: 'SERVICES', id: 'services' },
    { name: 'ABOUT', id: 'about' },
    { name: 'CONTACT', id: 'contact' },
    { name: 'CLIENT PORTAL', id: 'portal', special: true }
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black h-20 flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
          <div className="w-10 h-10 bg-brand-yellow border-2 border-black flex items-center justify-center font-display font-black text-xl text-black uppercase tracking-tighter">
            LS
          </div>
          <span className="text-2xl font-display font-black tracking-tighter uppercase text-black">LUMIÈRE</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-widest">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={\`hover:text-brand-yellow transition-colors \${link.special ? 'bg-black text-white px-4 py-2 border-2 border-black hover:bg-brand-yellow hover:text-black' : 'text-black'}\`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="bg-brand-yellow text-black border-2 border-black px-6 py-2 hover:bg-black hover:text-brand-yellow transition-colors uppercase tracking-widest font-bold"
          >
            BOOK NOW
          </button>
        </nav>

        <button className="lg:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b-4 border-black flex flex-col p-6 gap-6 font-bold text-lg">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNav(link.id)}
              className={\`text-left uppercase \${link.special ? 'text-brand-yellow bg-black border-2 border-black p-3 inline-block w-max' : 'text-black'}\`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="bg-brand-yellow text-black border-2 border-black p-4 text-center uppercase tracking-widest mt-4"
          >
            BOOK NOW
          </button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 border-t-8 border-brand-yellow">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-yellow flex items-center justify-center font-display font-black text-xl text-black uppercase tracking-tighter">LS</div>
            <span className="text-2xl font-display font-black tracking-tighter uppercase">LUMIÈRE</span>
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">HIGH-END COMMERCIAL PHOTOGRAPHY.</p>
        </div>
        <div>
          <h4 className="font-display font-black text-brand-yellow uppercase tracking-widest mb-6">MENU</h4>
          <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
            <li><a href="#portfolio" className="hover:text-brand-yellow transition-colors">Portfolio</a></li>
            <li><a href="#services" className="hover:text-brand-yellow transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-brand-yellow transition-colors">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-black text-brand-yellow uppercase tracking-widest mb-6">CONNECT</h4>
          <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Behance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-black text-brand-yellow uppercase tracking-widest mb-6">CONTACT</h4>
          <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
            <li>HELLO@LUMIERE.ART</li>
            <li>+55 11 9999-9999</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto border-t-4 border-white/20 mt-12 pt-8 text-xs font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between text-gray-500">
        <span>&copy; {new Date().getFullYear()} LUMIÈRE STUDIOS.</span>
        <span>CNPJ: 00.000.000/0001-00</span>
      </div>
    </footer>
  );
}
`,

  'src/sections/HeroSection.tsx': `import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] bg-black text-white flex flex-col justify-center items-center overflow-hidden border-b-8 border-brand-yellow">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay grayscale"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="bg-brand-yellow text-black font-bold uppercase tracking-[0.3em] px-4 py-2 text-sm mb-8 inline-block border-2 border-brand-yellow">
          PREMIUM STUDIO
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-display font-black leading-[0.85] tracking-tighter uppercase mb-8 text-white">
          WE SHOOT <br/>
          <span className="text-brand-yellow">COMMERCIAL</span> <br/>
          IMPACT.
        </h1>
        <p className="text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-12 uppercase tracking-wide">
          Photography and film production for brands that demand attention. No excuses. Just results.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-yellow text-black border-4 border-brand-yellow hover:bg-black hover:text-brand-yellow px-8 py-5 font-display font-black text-xl md:text-2xl uppercase tracking-widest transition-colors"
          >
            START A PROJECT
          </button>
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white border-4 border-white hover:bg-white hover:text-black px-8 py-5 font-display font-black text-xl md:text-2xl uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
          >
            VIEW WORK <ArrowDown size={28} strokeWidth={3} />
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
    name: 'STUDIO SESSION',
    price: '$1,500',
    description: 'Perfect for e-commerce, product drops, and clean editorial portraits.',
    features: ['Half-Day Studio Access', 'Unlimited Outfits', '50 Retouched Assets', 'Commercial Licensing'],
    recommended: false
  },
  {
    id: 'campaign',
    name: 'FULL CAMPAIGN',
    price: '$4,500',
    description: 'Complete visual overhaul for your next big product launch or seasonal campaign.',
    features: ['Full-Day Production', 'Location & Studio', '150+ Retouched Assets', '1 Min Promo Video', 'Full Buyout Rights'],
    recommended: true
  },
  {
    id: 'retainer',
    name: 'BRAND RETAINER',
    price: '$3,000',
    description: 'Consistent, high-quality content delivered every single month.',
    features: ['1 Shoot Per Month', 'Social Media Formatting', 'Priority Booking', 'Dedicated Art Director'],
    recommended: false
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white text-black border-b-8 border-black">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-4">INVESTMENT</h2>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-widest bg-black text-brand-yellow inline-block px-6 py-2">Straightforward pricing. Unmatched quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={\`border-8 border-black p-8 md:p-10 flex flex-col transition-transform hover:-translate-y-2 \${pkg.recommended ? 'bg-brand-yellow relative transform shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}\`}>
              {pkg.recommended && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-brand-yellow font-display font-black px-8 py-2 uppercase tracking-widest border-4 border-brand-yellow text-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter mb-4">{pkg.name}</h3>
              <p className="font-bold text-sm lg:text-base mb-8 flex-1 uppercase tracking-wide leading-relaxed">{pkg.description}</p>
              <div className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-8 border-b-8 border-black pb-8">
                {pkg.price}
              </div>
              <ul className="space-y-4 font-bold uppercase text-sm lg:text-base mb-12 tracking-wide">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <Check className="w-8 h-8 shrink-0 bg-black text-white p-1" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-5 font-display font-black text-xl md:text-2xl uppercase tracking-widest border-4 border-black transition-colors \${pkg.recommended ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-brand-yellow text-black hover:bg-black hover:text-brand-yellow'}\`}>
                SELECT PACKAGE
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
    { title: 'NIKE AIR', category: 'PRODUCT', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
    { title: 'VOGUE SS26', category: 'FASHION', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80' },
    { title: 'TECH WEAR', category: 'LIFESTYLE', img: 'https://images.unsplash.com/photo-1523398002811-999aa8e9ddaa?w=800&q=80' },
    { title: 'ROLEX', category: 'COMMERCIAL', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80' },
    { title: 'URBAN', category: 'EDITORIAL', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
    { title: 'BEAUTY', category: 'PORTRAIT', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' }
  ];

  return (
    <section id="portfolio" className="bg-black text-white py-24 border-b-8 border-brand-yellow">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">SELECTED <br/><span className="text-brand-yellow">WORKS</span></h2>
          <button className="bg-white text-black border-4 border-white hover:bg-black hover:text-brand-yellow px-8 py-5 font-display font-black text-xl uppercase tracking-widest transition-colors">
            VIEW FULL ARCHIVE
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group relative aspect-[4/5] bg-gray-900 overflow-hidden border-8 border-white/20 hover:border-brand-yellow transition-colors cursor-pointer">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-brand-yellow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
                <span className="bg-black text-brand-yellow px-4 py-2 font-bold uppercase tracking-[0.3em] mb-4 text-sm border-2 border-black">{p.category}</span>
                <h3 className="text-5xl font-display font-black text-black uppercase tracking-tighter">{p.title}</h3>
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
    <section id="about" className="bg-brand-yellow py-24 text-black border-b-8 border-black">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase mb-8 leading-[0.85]">
            NO FLUFF.<br/>
            JUST <span className="bg-black text-white px-2">IMPACT.</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold uppercase leading-relaxed mb-12 tracking-wide">
            We are a commercial photography and film production studio built for modern brands. We don't do boring. We create high-converting visual assets that make your competitors nervous.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t-8 border-black pt-12">
            <div>
              <span className="block text-7xl font-display font-black tracking-tighter mb-2">500+</span>
              <span className="font-bold uppercase tracking-widest text-base">Campaigns Delivered</span>
            </div>
            <div>
              <span className="block text-7xl font-display font-black tracking-tighter mb-2">$50M</span>
              <span className="font-bold uppercase tracking-widest text-base">Client Revenue Generated</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-square bg-black border-8 border-black shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
          <img 
            src="https://images.unsplash.com/photo-1554046920-90dcac824ab8?w=800&q=80" 
            alt="Studio" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
      </div>
    </section>
  );
}
`,

  'src/sections/ClientSection.tsx': `export function ClientSection() {
  return (
    <section id="contact" className="py-24 bg-white text-black border-b-8 border-black">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-black text-white p-12 md:p-24 border-8 border-brand-yellow relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow translate-x-6 -translate-y-6 -z-10 hidden md:block border-8 border-black"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-yellow -translate-x-6 translate-y-6 -z-10 hidden md:block border-8 border-black"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-6 leading-none">
                READY TO <br/><span className="text-brand-yellow">DOMINATE?</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold uppercase mb-12 tracking-wide">Drop your details. We'll get back to you within 24 hours with a custom proposal.</p>
              <div className="space-y-6 font-bold uppercase tracking-widest border-t-8 border-white/20 pt-12 text-lg">
                <p className="flex flex-col sm:flex-row justify-between sm:items-center border-b-4 border-white/10 pb-6 gap-2">
                  <span className="text-brand-yellow bg-black px-2 border-2 border-brand-yellow">EMAIL</span> INFO@LUMIERE.ART
                </p>
                <p className="flex flex-col sm:flex-row justify-between sm:items-center border-b-4 border-white/10 pb-6 gap-2">
                  <span className="text-brand-yellow bg-black px-2 border-2 border-brand-yellow">PHONE</span> +55 11 9999-9999
                </p>
                <p className="flex flex-col sm:flex-row justify-between sm:items-center border-b-4 border-white/10 pb-6 gap-2">
                  <span className="text-brand-yellow bg-black px-2 border-2 border-brand-yellow">STUDIO</span> SAO PAULO, SP
                </p>
              </div>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-base font-bold uppercase tracking-widest text-brand-yellow mb-3">FULL NAME / BRAND</label>
                <input type="text" className="w-full bg-white text-black border-4 border-white p-5 font-bold text-lg focus:outline-none focus:border-brand-yellow" placeholder="JOHN DOE" />
              </div>
              <div>
                <label className="block text-base font-bold uppercase tracking-widest text-brand-yellow mb-3">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-white text-black border-4 border-white p-5 font-bold text-lg focus:outline-none focus:border-brand-yellow" placeholder="HELLO@BRAND.COM" />
              </div>
              <div>
                <label className="block text-base font-bold uppercase tracking-widest text-brand-yellow mb-3">PROJECT BUDGET</label>
                <select className="w-full bg-white text-black border-4 border-white p-5 font-bold text-lg focus:outline-none focus:border-brand-yellow uppercase appearance-none cursor-pointer">
                  <option>$1,000 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-bold uppercase tracking-widest text-brand-yellow mb-3">PROJECT DETAILS</label>
                <textarea rows={4} className="w-full bg-white text-black border-4 border-white p-5 font-bold text-lg focus:outline-none focus:border-brand-yellow resize-none" placeholder="TELL US ABOUT THE CAMPAIGN..."></textarea>
              </div>
              <button className="w-full bg-brand-yellow text-black border-4 border-brand-yellow hover:bg-black hover:text-brand-yellow p-6 font-display font-black text-3xl uppercase tracking-widest transition-colors mt-4">
                SEND INQUIRY
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
    <section className="min-h-[90vh] bg-black text-white flex flex-col justify-center items-center p-6 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
      <div className="relative z-10 w-full max-w-xl bg-white text-black p-12 md:p-16 border-8 border-brand-yellow shadow-[24px_24px_0px_0px_rgba(255,204,0,1)]">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-black text-brand-yellow flex items-center justify-center rounded-none border-4 border-brand-yellow">
            <Lock size={40} />
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase text-center mb-4">CLIENT PORTAL</h2>
        <p className="text-center font-bold uppercase text-lg mb-12 text-black bg-brand-yellow inline-block px-4 py-1 mx-auto w-max">ACCESS YOUR DELIVERABLES</p>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-black mb-3">ACCESS PIN</label>
            <input type="password" placeholder="••••••••" className="w-full bg-gray-100 border-4 border-black p-5 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-gray-300" />
          </div>
          <button className="w-full bg-brand-yellow text-black border-4 border-black hover:bg-black hover:text-brand-yellow p-6 font-display font-black text-2xl uppercase tracking-widest transition-colors mt-4">
            ENTER GALLERY
          </button>
          <button 
            type="button"
            onClick={() => setView('home')}
            className="w-full bg-transparent text-black border-4 border-transparent hover:border-black p-4 font-bold text-sm uppercase tracking-widest transition-colors"
          >
            RETURN HOME
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

