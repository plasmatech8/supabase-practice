import { writable } from 'svelte/store';

export const signedIn = writable(false);

export const userDetails = writable<UserInfo | undefined>();
