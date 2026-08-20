const fs = require('fs');
let code = fs.readFileSync('src/sections/BudgetBuilderSection.tsx', 'utf8');

const servicesTarget = `const SERVICES = [
  { id: 'product', name: 'Fotografia de Produto', price: 1500, icon: Camera },
  { id: 'fashion', name: 'Editorial / Moda', price: 2000, icon: User },
  { id: 'video', name: 'Filme Comercial', price: 3500, icon: Video },
];`;
const servicesReplacement = `const SERVICES = [
  { id: 'portrait', name: 'Retratos & Pessoal', price: 325, icon: User },
  { id: 'product', name: 'Fotografia de Produto', price: 350, icon: Camera },
  { id: 'fashion', name: 'Campanha & Editorial', price: 380, icon: Sparkles },
];`;

const durationsTarget = `const DURATIONS = [
  { id: 'half', name: 'Meia Diária (4h)', multiplier: 1, icon: Clock },
  { id: 'full', name: 'Diária Completa (8h)', multiplier: 1.8, icon: Calendar },
  { id: 'multi', name: '2+ Dias (Campanha)', multiplier: 3, icon: Sparkles },
];`;
const durationsReplacement = `const DURATIONS = [
  { id: '4h', name: 'Pocket (4 Horas)', multiplier: 4, icon: Clock },
  { id: '6h', name: 'Standard (6 Horas)', multiplier: 6, icon: Sparkles },
  { id: '8h', name: 'Full Day (8 Horas)', multiplier: 8, icon: Calendar },
];`;

const extrasTarget = `const EXTRAS = [
  { id: 'makeup', name: 'Beauty (Make & Hair)', price: 800 },
  { id: 'casting', name: 'Casting de Modelos', price: 1500 },
  { id: 'studio', name: 'Locação Premium', price: 1200 },
  { id: 'rush', name: 'Entrega Expressa (48h)', price: 500 },
];`;
const extrasReplacement = `const EXTRAS = [
  { id: 'edicao_fotos', name: 'Edição de Fotos', price: 650, type: 'fixed' },
  { id: 'video_gravacao', name: 'Cobertura em Vídeo', price: 1200, type: 'fixed' },
  { id: 'video_edicao', name: 'Edição de Vídeo', price: 850, type: 'fixed' },
  { id: 'expressa', name: 'Entrega Expressa (+25%)', price: 0.25, type: 'percentage' },
];`;

code = code.replace(servicesTarget, servicesReplacement);
code = code.replace(durationsTarget, durationsReplacement);
code = code.replace(extrasTarget, extrasReplacement);

fs.writeFileSync('src/sections/BudgetBuilderSection.tsx', code);
