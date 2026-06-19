import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/** Link card icons render at 40px; 2x for retina. */
export const LINK_ICON_SIZE = 80;

/** Hero avatar renders at 88px; 2x for retina. */
export const HERO_AVATAR_SIZE = 176;

export async function saveAvatarImage(input, outputFile, size) {
	const inputBuffer = typeof input === 'string' ? await readFile(input) : input;
	const ext = path.extname(outputFile).toLowerCase();
	let pipeline = sharp(inputBuffer).rotate().resize(size, size, {
		fit: 'cover',
		position: 'centre',
	});

	let bytes;
	if (ext === '.png') {
		bytes = await pipeline.png({ compressionLevel: 9 }).toBuffer();
	} else if (ext === '.webp') {
		bytes = await pipeline.webp({ quality: 85 }).toBuffer();
	} else {
		bytes = await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
	}

	await mkdir(path.dirname(outputFile), { recursive: true });
	await writeFile(outputFile, bytes);

	return outputFile;
}
