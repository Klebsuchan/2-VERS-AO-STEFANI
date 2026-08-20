const fs = require('fs');
let code = fs.readFileSync('src/sections/AboutMeSection.tsx', 'utf8');
code = code.replace(/import \{ LiquidDistortion \} from '\.\.\/components\/LiquidDistortion';\n/, '');
code = code.replace(/<LiquidDistortion scale=\{10\} speed=\{10\} className="w-full h-full flex">([\s\S]*?)<\/LiquidDistortion>/, '$1');
fs.writeFileSync('src/sections/AboutMeSection.tsx', code);
