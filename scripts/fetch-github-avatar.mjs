import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_AVATAR_SIZE, LINK_ICON_SIZE, saveAvatarImage } from './lib/avatar-image.mjs';

const username = process.argv[2] ?? process.env.GITHUB_USERNAME;

if (!username) {
	console.error('Usage: npm run fetch:github-avatar -- YOUR_GITHUB_USERNAME');
	console.error('Example: npm run fetch:github-avatar -- rasxcore');
	process.exit(1);
}

const profile = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
	headers: {
		'User-Agent': 'rasxcore-link-site/1.0',
		Accept: 'application/vnd.github+json',
	},
}).then((response) => {
	if (response.status === 404) throw new Error(`GitHub user not found: ${username}`);
	if (!response.ok) throw new Error(`GitHub API error (${response.status})`);
	return response.json();
});

const avatarUrl = profile.avatar_url;
if (!avatarUrl) {
	throw new Error('Could not find avatar URL in GitHub profile');
}

const sizedUrl = new URL(avatarUrl);
sizedUrl.searchParams.set('s', '512');

const avatarResponse = await fetch(sizedUrl, {
	headers: { 'User-Agent': 'rasxcore-link-site/1.0' },
});

if (!avatarResponse.ok) {
	throw new Error(`Failed to download avatar (${avatarResponse.status})`);
}

const bytes = Buffer.from(await avatarResponse.arrayBuffer());
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const linkFile = path.join(root, 'src', 'assets', 'icons', 'github-avatar.jpg');
const heroFile = path.join(root, 'public', 'icons', 'hero-avatar.jpg');

await saveAvatarImage(bytes, linkFile, LINK_ICON_SIZE);
await saveAvatarImage(bytes, heroFile, HERO_AVATAR_SIZE);

console.log(`Avatar saved: src/assets/icons/github-avatar.jpg (${LINK_ICON_SIZE}px)`);
console.log(`Avatar saved: public/icons/hero-avatar.jpg (${HERO_AVATAR_SIZE}px)`);
console.log(`Source URL: ${avatarUrl}`);
