import fs from 'fs';
import path from 'path';

// Create output directory
const outputDir = '.vercel/output/static';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy files
fs.copyFileSync('index.html', path.join(outputDir, 'index.html'));
fs.copyFileSync('tax-invoice.html', path.join(outputDir, 'tax-invoice.html'));

console.log('✅ Build completed: Files copied to .vercel/output/static/');
