export type LinkCategory = 'music' | 'gaming' | 'social' | 'interests';

export type LinkIcon =
	| 'spotify'
	| 'vrchat'
	| 'steam'
	| 'discord'
	| 'telegram'
	| 'github'
	| 'backrooms';

export interface SiteLink {
	id: string;
	url: string;
	category: LinkCategory;
	icon: LinkIcon;
	labelKey: string;
	descriptionKey: string;
	/** Custom icon path under public/ or remote URL. Steam, Telegram, GitHub use src/assets via link-icons.ts */
	iconImage?: string;
}

export const links: SiteLink[] = [
	{
		id: 'spotify',
		url: 'https://open.spotify.com/user/31ysmzrzn7xcm64qvotjcdccfeqi',
		category: 'music',
		icon: 'spotify',
		labelKey: 'link.spotify.label',
		descriptionKey: 'link.spotify.desc',
		iconImage: 'icons/spotify-avatar.png',
	},
	{
		id: 'steam',
		url: 'https://steamcommunity.com/id/rasxcore/',
		category: 'gaming',
		icon: 'steam',
		labelKey: 'link.steam.label',
		descriptionKey: 'link.steam.desc',
	},
	{
		id: 'vrchat',
		url: 'https://vrchat.com/home/user/usr_b5d40e5e-61c5-4177-a72c-3d36a4d5bd75',
		category: 'gaming',
		icon: 'vrchat',
		labelKey: 'link.vrchat.label',
		descriptionKey: 'link.vrchat.desc',
		iconImage: 'icons/vrchat-avatar.png',
	},
		// {
	// 	id: 'discord',
	// 	url: ,
	// 	category: 'gaming',
	// 	icon: 'discord',
	// 	labelKey: 'link.discord.label',
	// 	descriptionKey: 'link.discord.desc',
	// },
	{
		id: 'telegram',
		url: 'https://t.me/rasxcore',
		category: 'social',
		icon: 'telegram',
		labelKey: 'link.telegram.label',
		descriptionKey: 'link.telegram.desc',
	},
	{
		id: 'github',
		url: 'https://github.com/rasxcore',
		category: 'social',
		icon: 'github',
		labelKey: 'link.github.label',
		descriptionKey: 'link.github.desc',
	},
	{
		id: 'backrooms',
		url: 'https://backrooms.fandom.com/wiki/Backrooms_Wiki',
		category: 'interests',
		icon: 'backrooms',
		labelKey: 'link.backrooms.label',
		descriptionKey: 'link.backrooms.desc',
		iconImage: 'icons/backrooms-logo.png',
	},
];

export const categoryOrder: LinkCategory[] = ['social', 'gaming', 'music', 'interests'];
