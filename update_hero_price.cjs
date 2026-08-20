const fs = require('fs');
let code = fs.readFileSync('src/sections/HeroSection.tsx', 'utf8');

const target = `<p className="text-base md:text-xl text-brand-black/80 max-w-lg mb-10 font-medium leading-relaxed">
            Produção fotográfica e audiovisual de alto nível para campanhas publicitárias, moda, e marcas que desejam se destacar no mercado.
          </p>`;

const replacement = `<div className="flex flex-col gap-6 mb-10 max-w-lg">
            <p className="text-base md:text-xl text-brand-black/80 font-medium leading-relaxed">
              Produção fotográfica de alto nível. Uma experiência exclusiva projetada para elevar a sua imagem.
            </p>
            <div className="flex items-center gap-4 bg-brand-cream-dark/50 p-4 rounded-2xl border border-brand-black/5 w-fit">
              <div className="bg-brand-black text-brand-cream px-4 py-2 rounded-xl font-bold text-xl md:text-2xl font-bodoni flex items-start shadow-xl">
                R$ 325<span className="text-[10px] md:text-xs font-normal text-brand-yellow mt-1">,00/h</span>
              </div>
              <div className="text-brand-black/90 text-sm md:text-base font-medium leading-tight">
                Fotos <span className="font-bold underline decoration-brand-yellow">ilimitadas</span> <br/>
                <span className="text-xs text-brand-black/60 font-bold uppercase tracking-wider">+ Brinde exclusivo</span>
              </div>
            </div>
          </div>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/sections/HeroSection.tsx', code);
