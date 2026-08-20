const fs = require('fs');
const path = require('path');

const userImages = [
  'imsgensfoto (1).jpeg',
  'imsgensfoto (2).jpeg',
  'imsgensfoto (3).jpeg',
  'imsgensfoto (4).jpeg',
  'imsgensfoto (5).jpeg',
  'imsgensfoto (6).jpeg',
  'imsgensfoto (7).jpeg',
  'imsgensfoto (8).jpeg',
  'imsgensfoto (11).jpeg'
];

let imgIndex = 0;

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/sections');

files.forEach(file => {
  if (file.includes('PortfolioSection.tsx')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  
  content = content.replace(/\/([a-zA-Z0-9-]+\.jpeg|IMG_\d+\.jpeg)/gi, (match, p1) => {
    if (p1.startsWith('imsgensfoto') || p1.startsWith('fotosgaleria') || p1.startsWith('hero')) {
      return match; // skip already replaced
    }
    
    hasChanges = true;
    const imgName = userImages[imgIndex % userImages.length];
    imgIndex++;
    return `/${encodeURI(imgName)}`;
  });
  
  if (hasChanges) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});

// Explicitly handle HeroSection main image
let heroContent = fs.readFileSync('src/sections/HeroSection.tsx', 'utf8');
// Find the main hero image placeholder which was probably IMG_4364.jpeg or something, but let's just find the first img tag that is huge.
heroContent = heroContent.replace(/src="\/imsgensfoto\%20\(\d+\)\.jpeg"\n\s+alt="High Fashion Photography"/, 'src="/hero.jpg"\n                 alt="High Fashion Photography"');
// Fallback in case it wasn't replaced yet:
heroContent = heroContent.replace(/src="\/[A-Za-z0-9-_\.]+\.jpeg"\n\s+alt="High Fashion Photography"/, 'src="/hero.jpg"\n                 alt="High Fashion Photography"');
fs.writeFileSync('src/sections/HeroSection.tsx', heroContent, 'utf8');
console.log('Updated HeroSection main image');

