const fs = require('fs');
let code = fs.readFileSync('src/sections/ServicesSection.tsx', 'utf8');

const target = `const PACKAGES = [
  {
    id: 'studio',
    name: 'Ensaio Essencial',
    price: 'R$ 2.500',
    description: 'Perfeito para e-commerce, lançamentos de produtos e retratos corporativos modernos.',
    features: ['Meia diária em estúdio', 'Direção de arte básica', '50 fotos tratadas em alta', 'Licença comercial inclusa'],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'campaign',
    name: 'Campanha Completa',
    price: 'R$ 7.800',
    description: 'Transformação visual completa para sua próxima grande campanha ou coleção.',
    features: ['Diária completa de produção', 'Estúdio ou Locação Externa', '150+ fotos com retoque premium', 'Vídeo Teaser para Reels/TikTok', 'Cessão total de direitos'],
    recommended: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'retainer',
    name: 'Retenção de Marca',
    price: 'Sob Consulta',
    description: 'Criação de conteúdo de altíssima qualidade entregue mensalmente para sua marca.',
    features: ['1 Produção por mês', 'Formatos otimizados para redes', 'Prioridade de agenda', 'Diretor de arte dedicado'],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  }
];`;

const replacement = `const PACKAGES = [
  {
    id: 'short',
    name: 'Pocket Session',
    price: 'R$ 1.300',
    description: 'Sessão curta e objetiva. Ideal para atualizar o portfólio, ensaios pessoais ou pequenos negócios.',
    features: ['4 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Direção de arte e poses', 'Brinde exclusivo', 'Licença comercial inclusa'],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'standard',
    name: 'Standard Session',
    price: 'R$ 1.950',
    description: 'A experiência ideal. Tempo perfeito para múltiplas trocas de look e direção criativa refinada.',
    features: ['6 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas trocas de look', 'Brinde exclusivo impresso', 'Licença comercial inclusa'],
    recommended: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fullday',
    name: 'Full Day Session',
    price: 'R$ 2.600',
    description: 'Diária completa de produção. O pacote definitivo para campanhas, locações múltiplas e marcas.',
    features: ['8 horas de cobertura', 'Fotos ilimitadas e tratadas', 'Múltiplas locações', 'Vídeo Teaser (Reels/TikTok)', 'Brinde VIP + Direitos totais'],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  }
];`;

code = code.replace(target, replacement);

fs.writeFileSync('src/sections/ServicesSection.tsx', code);
