import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LINK_ICON_SIZE, saveAvatarImage } from './lib/avatar-image.mjs';

const input = process.argv[2] ?? process.env.VRCHAT_USER_ID;

if (!input) {
	console.error('Usage: npm run fetch:vrchat-avatar -- USER_ID_OR_PROFILE_URL');
	console.error(
		'Example: npm run fetch:vrchat-avatar -- usr_b5d40e5e-61c5-4177-a72c-3d36a4d5bd75',
	);
	process.exit(1);
}

const userId = input.includes('usr_')
	? input.match(/usr_[0-9a-f-]+/i)?.[0] ?? input
	: input.startsWith('http')
		? input.match(/usr_[0-9a-f-]+/i)?.[0]
		: `usr_${input}`;

if (!userId?.startsWith('usr_')) {
	throw new Error('Could not parse VRChat user ID (expected usr_...)');
}

const profileUrl = `https://vrchat.com/home/user/${userId}`;
const profileHtml = await fetch(profileUrl, {
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
		Accept: 'text/html',
	},
}).then((response) => {
	if (!response.ok) throw new Error(`VRChat profile not found (${response.status})`);
	return response.text();
});

const imageMatch = profileHtml.match(
	/https:\/\/api\.vrchat\.cloud\/api\/1\/image\/file_[0-9a-f-]+\/\d+\/\d+/i,
);

if (!imageMatch?.[0]) {
	throw new Error('Could not find avatar image URL on VRChat profile page');
}

const avatarUrl = imageMatch[0].replace(/\/\d+$/, '/512');
const avatarResponse = await fetch(avatarUrl, {
	headers: { 'User-Agent': 'rasxcore-link-site/1.0' },
});

if (!avatarResponse.ok) {
	throw new Error(`Failed to download avatar (${avatarResponse.status})`);
}

const contentType = avatarResponse.headers.get('content-type') ?? 'image/png';
const extension = contentType.includes('jpeg') || contentType.includes('jpg') ? 'jpg' : 'png';
const bytes = Buffer.from(await avatarResponse.arrayBuffer());

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = path.join(root, 'public', 'icons', `vrchat-avatar.${extension}`);

await saveAvatarImage(bytes, outputFile, LINK_ICON_SIZE);

console.log(`Avatar saved: public/icons/vrchat-avatar.${extension} (${LINK_ICON_SIZE}px)`);
console.log(`Source URL: ${avatarUrl}`);
