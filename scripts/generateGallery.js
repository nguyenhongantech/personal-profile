// scripts/generateGallery.js
// Run this script to auto-generate gallery.json from public/gallery

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/gallery');
const outputFileApp = path.join(__dirname, '../app/gallery.json');
const outputFilePublic = path.join(__dirname, '../public/gallery.json');

const files = fs.readdirSync(galleryDir);
const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(f)).map(f => ({
  src: `/gallery/${f}`,
  alt: generateAltText(f)
}));

function generateAltText(filename) {
  // Remove extension and clean up filename
  let alt = filename.replace(/\.[^.]+$/, '');
  
  // Handle specific patterns to create meaningful descriptions
  if (alt.startsWith('GSS-')) {
    return alt.replace('GSS-', 'GSS Event - ').replace(/[-_]/g, ' ');
  } else if (alt.startsWith('NDQ_')) {
    return alt.replace('NDQ_', 'Professional Photo - ').replace(/[-_]/g, ' ');
  } else if (alt.startsWith('UEF')) {
    return alt.replace('UEF', 'UEF Event - ').replace(/[-_]/g, ' ');
  } else if (alt.startsWith('IMG_')) {
    return 'Professional Photo';
  } else {
    // Generic cleanup for other files
    return alt.replace(/[-_]/g, ' ').replace(/^\d+/, '').trim() || 'Professional Photo';
  }
}

fs.writeFileSync(outputFileApp, JSON.stringify(images, null, 2));
fs.writeFileSync(outputFilePublic, JSON.stringify(images, null, 2));
console.log(`Gallery generated: ${outputFileApp} and ${outputFilePublic} with ${images.length} images`);
