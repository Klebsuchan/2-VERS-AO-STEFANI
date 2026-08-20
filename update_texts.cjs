const fs = require('fs');

function replaceInFile(filepath, target, replacement) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(target, replacement);
  fs.writeFileSync(filepath, content);
}

function replaceAllInFile(filepath, regex, replacement) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filepath, content);
}

// Navigation
replaceAllInFile('src/components/Navigation.tsx', /Estúdio Fotográfico/g, 'Fotógrafa');

// Services
replaceAllInFile('src/sections/ServicesSection.tsx', /Estúdio Essencial/g, 'Ensaio Essencial');
replaceAllInFile('src/sections/ServicesSection.tsx', /Meia diária de estúdio/g, 'Meia diária em estúdio'); // This implies location, which is fine

// Client Section
replaceAllInFile('src/sections/ClientSection.tsx', /<span className="text-brand-yellow uppercase tracking-widest text-\[10px\] font-bold">Estúdio<\/span>/g, '<span className="text-brand-yellow uppercase tracking-widest text-[10px] font-bold">Base</span>');

// FAQ
replaceAllInFile('src/sections/FAQSection.tsx', /nosso estúdio principal esteja localizado/g, 'minha base principal seja');
replaceAllInFile('src/sections/FAQSection.tsx', /nossa equipe tem disponibilidade/g, 'tenho disponibilidade (com minha equipe)');
replaceAllInFile('src/sections/FAQSection.tsx', /O estúdio providencia/g, 'Você providencia');

// About Section
replaceAllInFile('src/sections/AboutSection.tsx', /Sobre o Estúdio/g, 'O Conceito');
replaceAllInFile('src/sections/AboutSection.tsx', /Somos um estúdio de fotografia comercial focado em resultados\. Entendemos/g, 'Trabalho com fotografia comercial focada em resultados. Entendo');

// Testimonials
replaceAllInFile('src/sections/TestimonialsSection.tsx', /O estúdio cuidou/g, 'A equipe cuidou');

// Behind the scenes
replaceAllInFile('src/sections/BehindTheScenesSection.tsx', /ESTÚDIO VILA MADALENA/g, 'BASE VILA MADALENA');
replaceAllInFile('src/sections/BehindTheScenesSection.tsx', /nosso estúdio rotacionando/g, 'nossos bastidores rotacionando');

