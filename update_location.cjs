const fs = require('fs');

// File 1: ClientSection.tsx
let clientCode = fs.readFileSync('src/sections/ClientSection.tsx', 'utf8');
clientCode = clientCode.replace('<span className="text-brand-black">São Paulo, SP</span>', '<span className="text-brand-black">Passo Fundo, RS</span>');
fs.writeFileSync('src/sections/ClientSection.tsx', clientCode);

// File 2: FAQSection.tsx
let faqCode = fs.readFileSync('src/sections/FAQSection.tsx', 'utf8');
faqCode = faqCode.replace('Vocês realizam produções fora de São Paulo?', 'Vocês realizam produções fora de Passo Fundo?');
faqCode = faqCode.replace('minha base principal seja em São Paulo (Vila Madalena)', 'minha base principal seja em Passo Fundo (RS)');
fs.writeFileSync('src/sections/FAQSection.tsx', faqCode);

// File 3: BehindTheScenesSection.tsx
let btsCode = fs.readFileSync('src/sections/BehindTheScenesSection.tsx', 'utf8');
btsCode = btsCode.replace('BASE VILA MADALENA', 'BASE PASSO FUNDO');
fs.writeFileSync('src/sections/BehindTheScenesSection.tsx', btsCode);
