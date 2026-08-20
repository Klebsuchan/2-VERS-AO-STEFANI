const fs = require('fs');

let content = fs.readFileSync('src/components/CoverflowGallery.tsx', 'utf8');

// add description to Project interface
content = content.replace(/interface Project \{\n\s+title: string;\n\s+category: string;\n\s+img: string;\n\}/, `interface Project {\n  title: string;\n  category: string;\n  description?: string;\n  img: string;\n}`);

// add description to the UI rendering
const oldUI = `                      <h3 className="text-2xl font-bold text-brand-cream tracking-tight leading-tight">
                        {item.title}
                      </h3>`;
const newUI = `                      <h3 className="text-2xl font-bold text-brand-cream tracking-tight leading-tight mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-brand-cream/80 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}`;

content = content.replace(oldUI, newUI);

fs.writeFileSync('src/components/CoverflowGallery.tsx', content);
