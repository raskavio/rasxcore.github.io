import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'public', 'favicon.svg');
const output = path.join(root, 'public', 'favicon.ico');

await sharp(input, { density: 300 }).resize(32, 32, { fit: 'fill' }).toFile(output);

console.log('Generated public/favicon.ico (32x32) from favicon.svg');
