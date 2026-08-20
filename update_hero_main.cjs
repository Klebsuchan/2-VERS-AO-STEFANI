const fs = require('fs');
let code = fs.readFileSync('src/sections/HeroSection.tsx', 'utf8');

const target = `<img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800"
                 alt="High Fashion Photography"
                 className="w-full h-full object-cover scale-[1.02]"
               />`;

const replacement = `<motion.img
                  style={{ y: y1 }}
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800"
                 alt="High Fashion Photography"
                 className="w-full h-full object-cover scale-[1.15] origin-top"
               />`;

code = code.replace(target, replacement);

fs.writeFileSync('src/sections/HeroSection.tsx', code);
