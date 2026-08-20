const fs = require('fs');

let content = fs.readFileSync('src/components/CoverflowGallery.tsx', 'utf8');

const oldOverlay = `{isCenter && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent flex flex-col justify-end p-8"
                    >
                      <span className="text-brand-yellow font-bold uppercase tracking-widest text-[10px] mb-2 drop-shadow-md">
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-bold text-brand-cream tracking-tight leading-tight mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-brand-cream/80 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  )}`;

if(content.includes(oldOverlay)) {
  content = content.replace(oldOverlay, '');
  fs.writeFileSync('src/components/CoverflowGallery.tsx', content);
  console.log("Successfully removed text overlay.");
} else {
  console.log("Overlay not found perfectly matching. Trying regex.");
  content = content.replace(/\{isCenter && \([\s\S]*?<\/motion\.div>\s*\)\}/, '');
  fs.writeFileSync('src/components/CoverflowGallery.tsx', content);
  console.log("Removed via regex.");
}
