<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import { Wave } from 'svelte-loading-spinners';
	let loading = true;

	onMount(async () => {
		const user = supabase.auth.user();
		if (!user) return goto('/signin');
		await new Promise((r) => setTimeout(r, 1000));
		// TODO: change loading to a reactive variable that waits for user profile to load
		loading = false;
	});
</script>

{#if !loading}
	<slot />
{:else}
	<div class="hero h-[80vh]">
		<Wave color="grey" />
	</div>
{/if}
