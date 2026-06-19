import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'public', 'og-image.svg');
const output = path.join(root, 'public', 'og-image.png');

await sharp(input, { density: 150 })
	.resize(1200, 630, { fit: 'fill' })
	.png({ compressionLevel: 9 })
	.toFile(output);

console.log('Generated public/og-image.png (1200x630)');
