const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

code = code.replace('Passo Fundo, RS<br/>Disponível para viagens', 'Passo Fundo, RS');

fs.writeFileSync('src/components/Navigation.tsx', code);
