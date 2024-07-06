import { writable, type Writable } from 'svelte/store';

export const darkMode = writable();
export const user = writable();

// too lazy to do types for this
export const fileProgress: Writable<{ [key: string]: any }> = writable({});
