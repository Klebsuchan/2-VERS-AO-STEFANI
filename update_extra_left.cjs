const fs = require('fs');
let code = fs.readFileSync('src/sections/BudgetBuilderSection.tsx', 'utf8');

const target = `{extra.type === 'percentage' ? '+25%' : '+' + formatCurrency(extra.price)}`;
const replacement = `{extra.type === 'percentage' ? (selectedExtras.includes('edicao_fotos') ? '+25%' : 'S/ Custo extra') : '+' + formatCurrency(extra.price)}`;

code = code.replace(target, replacement);

fs.writeFileSync('src/sections/BudgetBuilderSection.tsx', code);
