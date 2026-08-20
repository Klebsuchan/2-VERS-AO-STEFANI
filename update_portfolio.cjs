const fs = require('fs');

let content = fs.readFileSync('src/sections/PortfolioSection.tsx', 'utf8');

const newProjects = `const ALL_PROJECTS = [
  { id: 1, title: 'Ensaio Externo', category: 'Ensaios', description: 'Fotografia ao ar livre explorando a luz natural e a conexão com a natureza.', img: '/fotosgaleria%20(1).jpeg' },
  { id: 2, title: 'Casamento Ana & Paulo', category: 'Casamentos', description: 'Momentos inesquecíveis da cerimônia, capturando a emoção e os detalhes do casamento.', img: '/fotosgaleria%20(2).jpeg' },
  { id: 3, title: 'Retratos Femininos', category: 'Ensaios', description: 'Um olhar delicado e empoderado, ressaltando a beleza e a personalidade única.', img: '/fotosgaleria%20(3).jpeg' },
  { id: 4, title: 'Campanha de Marca', category: 'Comercial', description: 'Imagens comerciais direcionadas para destacar a essência e o produto da marca.', img: '/fotosgaleria%20(4).jpeg' },
  { id: 5, title: 'Casamento no Campo', category: 'Casamentos', description: 'Cerimônia ao ar livre com um clima rústico, rodeada por paisagens naturais.', img: '/fotosgaleria%20(5).jpeg' },
  { id: 6, title: 'Retratos Corporativos', category: 'Ensaios', description: 'Fotografia profissional com foco em credibilidade, posicionamento e perfil de negócios.', img: '/fotosgaleria%20(6).jpeg' },
  { id: 7, title: 'Editorial de Moda', category: 'Comercial', description: 'Composição criativa e conceitual, focada em tendências, texturas e estilo.', img: '/fotosgaleria%20(7).jpeg' },
  { id: 8, title: 'Pre-Wedding', category: 'Casamentos', description: 'Sessão fotográfica do casal antes do grande dia, em um ambiente descontraído e romântico.', img: '/fotosgaleria%20(8).jpeg' },
  { id: 9, title: 'Produto em Estúdio', category: 'Comercial', description: 'Fotografia de still life com iluminação controlada para evidenciar detalhes do produto.', img: '/fotosgaleria%20(9).jpeg' },
  { id: 10, title: 'Ensaio Gestante', category: 'Ensaios', description: 'Registro sensível e poético da maternidade, celebrando a espera e a nova vida.', img: '/fotosgaleria%20(10).jpeg' },
  { id: 11, title: 'Casamento Clássico', category: 'Casamentos', description: 'Registro elegante e tradicional, capturando a sofisticação da cerimônia e da recepção.', img: '/fotosgaleria%20(11).jpeg' },
  { id: 12, title: 'Eventos Corporativos', category: 'Comercial', description: 'Cobertura de palestras e eventos de negócios, focada em networking e momentos-chave.', img: '/fotosgaleria%20(12).jpeg' },
];`;

content = content.replace(/const ALL_PROJECTS = \[[\s\S]*?\];/, newProjects);
content = content.replace(/"NOSSO PORTFÓLIO"/g, '"MEU PORTFÓLIO"');
content = content.replace(/nossos projetos mais recentes/g, 'meus projetos mais recentes');

fs.writeFileSync('src/sections/PortfolioSection.tsx', content);
