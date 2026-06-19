import type { ImageMetadata } from 'astro';
import githubAvatar from '../assets/icons/github-avatar.jpg';
import steamAvatar from '../assets/icons/steam-avatar.jpg';
import telegramAvatar from '../assets/icons/telegram-avatar.png';

export const linkIconAssets: Record<string, ImageMetadata> = {
	steam: steamAvatar,
	telegram: telegramAvatar,
	github: githubAvatar,
};

export function hasOptimizedIcon(linkId: string): linkId is keyof typeof linkIconAssets {
	return linkId in linkIconAssets;
}
