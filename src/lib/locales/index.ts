import { writable } from 'svelte/store';

import de from './de.json';
import en from './en.json';

import { browser } from '$app/environment';

export const all = {
	de,
	en
} as {
	[locale: string]: typeof en;
};

export default writable(browser ? all[document.documentElement.lang] : en);
