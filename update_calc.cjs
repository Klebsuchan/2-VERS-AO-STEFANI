const fs = require('fs');
let code = fs.readFileSync('src/sections/BudgetBuilderSection.tsx', 'utf8');

const calcTarget = `  const calculateTotal = () => {
    const base = selectedService.price * selectedDuration.multiplier;
    const extrasTotal = selectedExtras.reduce((acc, extraId) => {
      const extra = EXTRAS.find(e => e.id === extraId);
      return acc + (extra ? extra.price : 0);
    }, 0);
    return base + extrasTotal;
  };`;

const calcReplacement = `  const calculateTotal = () => {
    const base = selectedService.price * selectedDuration.multiplier;
    
    // Fixed extras total
    const fixedExtrasTotal = selectedExtras.reduce((acc, extraId) => {
      const extra = EXTRAS.find(e => e.id === extraId);
      return acc + (extra && extra.type === 'fixed' ? extra.price : 0);
    }, 0);
    
    const subtotal = base + fixedExtrasTotal;
    
    // Express delivery percentage logic
    const hasExpress = selectedExtras.includes('expressa');
    const hasEditing = selectedExtras.includes('edicao_fotos');
    
    let total = subtotal;
    if (hasExpress && hasEditing) {
      total += subtotal * 0.25;
    }
    
    return total;
  };`;

code = code.replace(calcTarget, calcReplacement);
fs.writeFileSync('src/sections/BudgetBuilderSection.tsx', code);
