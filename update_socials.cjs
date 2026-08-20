const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const target = `<div className="flex items-center gap-6 text-[10px] sm:text-xs font-bold tracking-widest uppercase shrink-0">
          <a href="https://www.instagram.com/detalhes_artt?igsh=MWF4bzhuMjg2ajd5Mw%3D%3D&igsi=MWF4bzhuMjg2ajd5Mw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-brand-yellow transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-brand-yellow transition-colors">BEHANCE</a>
        </div>`;
const replacement = `<div className="flex items-center gap-6 text-[10px] sm:text-xs font-bold tracking-widest uppercase shrink-0">
          <a href="https://www.instagram.com/detalhes_artt?igsh=MWF4bzhuMjg2ajd5Mw%3D%3D&igsi=MWF4bzhuMjg2ajd5Mw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">INSTAGRAM</a>
        </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/Navigation.tsx', code);
