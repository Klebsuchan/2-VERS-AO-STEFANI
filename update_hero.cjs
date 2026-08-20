const fs = require('fs');
let code = fs.readFileSync('src/sections/HeroSection.tsx', 'utf8');

if (!code.includes("useScroll") && !code.includes("useTransform")) {
  code = code.replace(
    "import { motion } from 'motion/react';",
    "import { motion, useScroll, useTransform } from 'motion/react';\nimport { useRef } from 'react';"
  );
  
  code = code.replace(
    "export function HeroSection() {",
    "export function HeroSection() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const { scrollYProgress } = useScroll({\n    target: containerRef,\n    offset: ['start start', 'end start']\n  });\n  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);\n  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);\n  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);\n  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);\n"
  );
  
  code = code.replace(
    "<section className=\"relative w-full min-h-[100svh] pt-32 lg:pt-40 pb-16 lg:pb-24 flex flex-col justify-center items-center overflow-hidden\">",
    "<section ref={containerRef} className=\"relative w-full min-h-[100svh] pt-32 lg:pt-40 pb-16 lg:pb-24 flex flex-col justify-center items-center overflow-hidden\">"
  );

  // Main composite image
  code = code.replace(
    "<img\n                  src=\"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800\"\n                 alt=\"High Fashion Photography\"\n                 className=\"w-full h-full object-cover scale-[1.02]\"\n               />",
    "<motion.img\n                  style={{ y: y1 }}\n                  src=\"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800\"\n                 alt=\"High Fashion Photography\"\n                 className=\"w-full h-full object-cover scale-[1.15] origin-top\"\n               />"
  );

  // Card 1
  code = code.replace(
    "<img src=\"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover\" alt=\"Product close-up\" />",
    "<motion.img style={{ y: y2 }} src=\"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover scale-[1.25] origin-top\" alt=\"Product close-up\" />"
  );

  // Card 2
  code = code.replace(
    "<img src=\"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover\" alt=\"Fashion portrait\" />",
    "<motion.img style={{ y: y3 }} src=\"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover scale-[1.25] origin-top\" alt=\"Fashion portrait\" />"
  );

  // Card 3
  code = code.replace(
    "<img src=\"https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover\" alt=\"Corporate portrait\" />",
    "<motion.img style={{ y: y4 }} src=\"https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=300\" className=\"w-full h-full object-cover scale-[1.25] origin-top\" alt=\"Corporate portrait\" />"
  );

  fs.writeFileSync('src/sections/HeroSection.tsx', code);
}
