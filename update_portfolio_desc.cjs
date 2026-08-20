const fs = require('fs');

let content = fs.readFileSync('src/sections/PortfolioSection.tsx', 'utf8');

const newProjects = `const ALL_PROJECTS = [
  { id: 1, title: 'Retratos Femininos', category: 'Ensaios', description: 'Ensaio combinando a força dos retratos femininos com a serenidade de uma paisagem ao fundo.', img: '/fotosgaleria%20(1).jpeg' },
  { id: 2, title: 'Luz e Textura', category: 'Ensaios', description: 'Uma imagem rica em detalhes que convida o olhar a ler e descrever cada emoção capturada.', img: '/fotosgaleria%20(2).jpeg' },
  { id: 3, title: 'Fachada Comercial', category: 'Comercial', description: 'Fotografia de arquitetura destacando a estrutura de um prédio e a fachada de um estabelecimento comercial.', img: '/fotosgaleria%20(3).jpeg' },
  { id: 4, title: 'Cenários Naturais', category: 'Ensaios', description: 'O registro poético de uma paisagem bonita, onde a luz do sol revela a grandeza e tranquilidade da natureza.', img: '/fotosgaleria%20(4).jpeg' },
  { id: 5, title: 'Perfil Corporativo', category: 'Comercial', description: 'Retratos corporativos diferenciados, realizados ao ar livre em uma bela estrada cercada por muitas árvores.', img: '/fotosgaleria%20(5).jpeg' },
  { id: 6, title: 'Casamento no Campo', category: 'Casamentos', description: 'Cerimônia ao ar livre com um clima rústico, rodeada por paisagens naturais.', img: '/fotosgaleria%20(6).jpeg' },
  { id: 7, title: 'Editorial de Moda', category: 'Comercial', description: 'Composição criativa e conceitual, focada em tendências, texturas e estilo urbano.', img: '/fotosgaleria%20(7).jpeg' },
  { id: 8, title: 'Pre-Wedding', category: 'Casamentos', description: 'Sessão fotográfica do casal antes do grande dia, em um ambiente descontraído e romântico.', img: '/fotosgaleria%20(8).jpeg' },
  { id: 9, title: 'Produto em Estúdio', category: 'Comercial', description: 'Fotografia de still life com iluminação controlada para evidenciar detalhes do produto.', img: '/fotosgaleria%20(9).jpeg' },
  { id: 10, title: 'Ensaio Gestante', category: 'Ensaios', description: 'Registro sensível e poético da maternidade, celebrando a espera e a nova vida.', img: '/fotosgaleria%20(10).jpeg' },
  { id: 11, title: 'Casamento Clássico', category: 'Casamentos', description: 'Registro elegante e tradicional, capturando a sofisticação da cerimônia e da recepção.', img: '/fotosgaleria%20(11).jpeg' },
  { id: 12, title: 'Eventos Corporativos', category: 'Comercial', description: 'Cobertura de palestras e eventos de negócios, focada em networking e momentos-chave.', img: '/fotosgaleria%20(12).jpeg' },
];`;

content = content.replace(/const ALL_PROJECTS = \[[\s\S]*?\];/, newProjects);

fs.writeFileSync('src/sections/PortfolioSection.tsx', content);
