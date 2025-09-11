import de from './de.json';
import en from './en.json';
import { writable } from 'svelte/store';

export const all = {
	de,
	en
} as {
	[locale: string]: typeof en;
};

export default writable(en);
