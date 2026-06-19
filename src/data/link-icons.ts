import type { ImageMetadata } from 'astro';
import backroomsLogo from '../assets/icons/backrooms-logo.png';
import githubAvatar from '../assets/icons/github-avatar.jpg';
import spotifyAvatar from '../assets/icons/spotify-avatar.png';
import steamAvatar from '../assets/icons/steam-avatar.jpg';
import telegramAvatar from '../assets/icons/telegram-avatar.png';
import vrchatAvatar from '../assets/icons/vrchat-avatar.png';

export const linkIconAssets: Record<string, ImageMetadata> = {
	spotify: spotifyAvatar,
	vrchat: vrchatAvatar,
	steam: steamAvatar,
	telegram: telegramAvatar,
	github: githubAvatar,
	backrooms: backroomsLogo,
};

export function hasOptimizedIcon(linkId: string): linkId is keyof typeof linkIconAssets {
	return linkId in linkIconAssets;
}
