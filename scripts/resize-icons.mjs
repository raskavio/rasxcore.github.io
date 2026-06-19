import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_AVATAR_SIZE, LINK_ICON_SIZE, saveAvatarImage } from './lib/avatar-image.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = path.join(root, 'public', 'icons');
const assetIconsDir = path.join(root, 'src', 'assets', 'icons');

/** filename -> target size in px */
const publicIcons = {
	'vrchat-avatar.png': LINK_ICON_SIZE,
	'spotify-avatar.png': LINK_ICON_SIZE,
	'backrooms-logo.png': LINK_ICON_SIZE,
	'hero-avatar.jpg': HERO_AVATAR_SIZE,
};

const assetIcons = {
	'steam-avatar.jpg': LINK_ICON_SIZE,
	'github-avatar.jpg': LINK_ICON_SIZE,
	'telegram-avatar.png': LINK_ICON_SIZE,
};

for (const [filename, size] of Object.entries(publicIcons)) {
	const file = path.join(iconsDir, filename);
	try {
		await saveAvatarImage(file, file, size);
		console.log(`Resized public/icons/${filename} -> ${size}x${size}`);
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn(`Skipped public/icons/${filename} (file not found)`);
			continue;
		}
		throw error;
	}
}

for (const [filename, size] of Object.entries(assetIcons)) {
	const file = path.join(assetIconsDir, filename);
	try {
		await saveAvatarImage(file, file, size);
		console.log(`Resized src/assets/icons/${filename} -> ${size}x${size}`);
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn(`Skipped src/assets/icons/${filename} (file not found)`);
			continue;
		}
		throw error;
	}
}

console.log('');
console.log('Done. Link icons:', LINK_ICON_SIZE, 'px, hero:', HERO_AVATAR_SIZE, 'px');
