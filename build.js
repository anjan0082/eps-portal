import fs from 'fs';
import path from 'path';

// Create output directory
const outputDir = '.vercel/output/static';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy index.html
if (fs.existsSync('index.html')) {
  fs.copyFileSync('index.html', path.join(outputDir, 'index.html'));
  console.log('✅ Copied index.html');
}

// Copy tax-invoice.html if it exists
if (fs.existsSync('tax-invoice.html')) {
  fs.copyFileSync('tax-invoice.html', path.join(outputDir, 'tax-invoice.html'));
  console.log('✅ Copied tax-invoice.html');
}

console.log('✅ Build completed!');
