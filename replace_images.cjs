const fs = require('fs');
const path = require('path');

const userImages = [
  '7703F5A3-A1B8-4D24-BF34-41D16AC13A63.jpeg',
  '8CCD17AD-C533-4B35-A1C0-78E43FF0B340.jpeg',
  'E132C380-79A2-49DB-B20D-4680CDD175FC.jpeg',
  '3AE63C1E-9D88-4665-970C-942DE003F522.jpeg',
  'IMG_0257.jpeg',
  'IMG_0277.jpeg',
  'IMG_0258.jpeg',
  '1C4687F9-9D13-4D75-A575-CD571F0C7F12.jpeg',
  '6F76B1E5-DFC5-4012-B759-2C4B02DAF454.jpeg',
  'IMG_4053.jpeg',
  'IMG_4054.jpeg',
  'IMG_4360.jpeg',
  'IMG_4364.jpeg',
  'IMG_4382.jpeg',
  '12f49a94-937b-4481-9095-fe9d716b58e3.jpeg',
  'b8cf2df6-55de-4b96-80cd-b58e246a64ac.jpeg',
  'f0a04164-863c-4836-a64c-ede94850aa2d.jpeg',
  '1d82659c-9477-445a-925c-bf55ad618a76.jpeg',
  'b1b40047-530e-4ba1-b6d5-7bfb0a2d59f5.jpeg',
  '2412be1c-1520-4046-9d67-76fdde7a818f.jpeg',
  'c65954b1-b9ea-4128-9422-e4a379005601.jpeg',
  'a6cb938f-cafb-457d-8801-8d7a167e572e.jpeg',
  'a3762e18-3bc0-438d-9939-cf6b64336ef4.jpeg'
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

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  
  // Replace all https://images.unsplash.com... occurrences
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"'\s]+/g, (match) => {
    hasChanges = true;
    const imgName = userImages[imgIndex % userImages.length];
    imgIndex++;
    return `/${imgName}`; // using root path so Vite references the public folder or intercepts it
  });
  
  if (hasChanges) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});
