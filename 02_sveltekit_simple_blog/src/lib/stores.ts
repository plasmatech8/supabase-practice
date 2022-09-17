import supabase from '$lib/supabase';
import type { User } from '@supabase/supabase-js';
import { readable, writable } from 'svelte/store';

export const user = readable<User | null>(null, (set) => {
	set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => set(session?.user || null));
});

export const userDetails = writable<UserInfo | null>(null, (set) => {
	// TODO: redo this code
	// need to add an auth signup trigger in the backend to create a user profile record
	const setData = (u: User) =>
		set({
			profilePicture: u.user_metadata.avatar_url || 'https://placeimg.com/80/80/people',
			email: u.email || '-',
			firstname: u.user_metadata.name.split(' ')[0],
			lastname: u.user_metadata.name.split(' ')[1]
		});

	const u = supabase.auth.user();
	if (u) setData(u);
	supabase.auth.onAuthStateChange((_, session) => {
		const u = session?.user;
		if (u) setData(u);
	});
});
