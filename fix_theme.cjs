const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // For HeroSection, we want it to stay dark ALWAYS.
  if (file.includes('HeroSection.tsx')) {
    content = content.replace(/bg-brand-black/g, 'bg-[#0d0c0b]');
    content = content.replace(/text-brand-cream/g, 'text-[#fbfaf8]');
  } 
  else if (file.includes('PremiumBadge.tsx')) {
    // Keep it dark always
    content = content.replace(/bg-brand-black/g, 'bg-[#0d0c0b]');
    content = content.replace(/from-brand-black/g, 'from-[#0d0c0b]');
    content = content.replace(/via-brand-black/g, 'via-[#0d0c0b]');
  }
  else if (file.includes('Footer.tsx') || content.includes('function Footer')) {
    // Let's check if Footer is inside Navigation.tsx
    // We want to handle Footer but it's in Navigation.tsx
  }

  // General Replacements for adaptive sections
  if (!file.includes('HeroSection.tsx') && !file.includes('PremiumBadge.tsx')) {
    // 1. Swap main background and text colors to be adaptive
    content = content.replace(/bg-brand-black/g, 'bg-brand-cream');
    
    // We need to be careful with text-brand-cream -> text-brand-black.
    // Let's replace text-brand-cream with text-brand-black
    content = content.replace(/text-brand-cream/g, 'text-brand-black');
    
    // 2. Replace hardcoded translucent blacks with adaptive cream-dark
    content = content.replace(/bg-black\/40/g, 'bg-brand-cream-dark/60');
    content = content.replace(/bg-black\/50/g, 'bg-brand-cream-dark/70');
    content = content.replace(/bg-black\/60/g, 'bg-brand-cream-dark/80');
    content = content.replace(/bg-black\/80/g, 'bg-brand-cream-dark/90');
    
    // For shadows that are too dark in light mode:
    // Actually, shadow-[0_30px_60px_rgba(0,0,0,0.8)] might be too harsh in light mode.
    // Let's just leave shadows alone for now, or lighten them if possible.
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
