const fs = require('fs');
let code = fs.readFileSync('src/sections/BudgetBuilderSection.tsx', 'utf8');

const extraRenderTarget = `<span className="text-xs text-brand-black/70 font-bold tracking-wider">+{formatCurrency(extra.price)}</span>`;
const extraRenderReplacement = `<span className="text-xs text-brand-black/70 font-bold tracking-wider">
                        {extra.type === 'percentage' ? '+25%' : '+' + formatCurrency(extra.price)}
                      </span>`;

code = code.replace(extraRenderTarget, extraRenderReplacement);

const extraSummaryTarget = `<div key={extra.id} className="flex justify-between items-center text-brand-black/70">
                          <span>{extra.name}</span>
                          <span className="font-bold text-brand-black">{formatCurrency(extra.price)}</span>
                        </div>`;
const extraSummaryReplacement = `<div key={extra.id} className="flex justify-between items-center text-brand-black/70">
                          <span>{extra.name}</span>
                          <span className="font-bold text-brand-black">
                            {extra.type === 'percentage' 
                              ? (selectedExtras.includes('edicao_fotos') ? '+25%' : 'Grátis (Sem edição)')
                              : formatCurrency(extra.price)}
                          </span>
                        </div>`;

code = code.replace(extraSummaryTarget, extraSummaryReplacement);

fs.writeFileSync('src/sections/BudgetBuilderSection.tsx', code);
