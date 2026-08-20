const fs = require('fs');

let file;

// 1. BudgetBuilderSection.tsx
file = 'src/sections/BudgetBuilderSection.tsx';
let budget = fs.readFileSync(file, 'utf8');
budget = budget.replace('para nosso WhatsApp comercial', 'para meu WhatsApp');
fs.writeFileSync(file, budget);

// 2. ClientSection.tsx
file = 'src/sections/ClientSection.tsx';
let client = fs.readFileSync(file, 'utf8');
client = client.replace('com nossa equipe comercial', 'comigo');
fs.writeFileSync(file, client);

// 3. FAQSection.tsx
file = 'src/sections/FAQSection.tsx';
let faq = fs.readFileSync(file, 'utf8');
faq = faq.replace('Nosso processo é', 'Meu processo é');
faq = faq.replace('Após recebermos', 'Após receber');
faq = faq.replace('agendamos uma', 'agendo uma');
faq = faq.replace('enviamos uma proposta', 'envio uma proposta');
faq = faq.replace('nossos orçamentos', 'meus orçamentos');
fs.writeFileSync(file, faq);

// 4. TestimonialsSection.tsx
file = 'src/sections/TestimonialsSection.tsx';
let test = fs.readFileSync(file, 'utf8');
test = test.replace('A equipe cuidou de cada detalhe', 'Ela cuidou de cada detalhe');
fs.writeFileSync(file, test);

// 5. BehindTheScenesSection.tsx
file = 'src/sections/BehindTheScenesSection.tsx';
let behind = fs.readFileSync(file, 'utf8');
behind = behind.replace('NOSSA EQUIPE', 'MINHA ESTRUTURA');
behind = behind.replace('nossos bastidores', 'meus bastidores');
fs.writeFileSync(file, behind);
