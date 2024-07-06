import { writable, type Writable } from 'svelte/store';
import type { UserSafe } from '../app';

export const darkMode = writable();
export const user: Writable<UserSafe> = writable();

// too lazy to do types for this
export const fileProgress: Writable<{ [key: string]: any }> = writable({});
