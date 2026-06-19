import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LINK_ICON_SIZE, saveAvatarImage } from './lib/avatar-image.mjs';

const vanityOrId = process.argv[2] ?? process.env.STEAM_VANITY;

if (!vanityOrId) {
	console.error('Usage: npm run fetch:steam-avatar -- YOUR_STEAM_ID');
	console.error('Example: npm run fetch:steam-avatar -- rasxcore');
	process.exit(1);
}

const profileUrl = `https://steamcommunity.com/id/${encodeURIComponent(vanityOrId)}/?xml=1`;

const xml = await fetch(profileUrl, {
	headers: { 'User-Agent': 'rasxcore-link-site/1.0' },
}).then((response) => {
	if (!response.ok) throw new Error(`Steam profile not found (${response.status})`);
	return response.text();
});

const avatarMatch =
	xml.match(/<avatarFull><!\[CDATA\[([^\]]+)\]\]><\/avatarFull>/) ??
	xml.match(/<avatarFull>([^<]+)<\/avatarFull>/);

if (!avatarMatch?.[1]) {
	throw new Error('Could not find avatar URL in Steam profile XML');
}

const avatarUrl = avatarMatch[1].trim();
const avatarResponse = await fetch(avatarUrl);

if (!avatarResponse.ok) {
	throw new Error(`Failed to download avatar (${avatarResponse.status})`);
}

const contentType = avatarResponse.headers.get('content-type') ?? 'image/jpeg';
const extension = contentType.includes('png') ? 'png' : 'jpg';
const bytes = Buffer.from(await avatarResponse.arrayBuffer());

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = path.join(root, 'src', 'assets', 'icons', `steam-avatar.${extension}`);

await saveAvatarImage(bytes, outputFile, LINK_ICON_SIZE);

console.log(`Avatar saved: src/assets/icons/steam-avatar.${extension} (${LINK_ICON_SIZE}px)`);
console.log(`Source URL: ${avatarUrl}`);
