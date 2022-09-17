<script lang="ts">
	import { goto } from '$app/navigation';
	import { signedIn, userDetails } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Wave } from 'svelte-loading-spinners';
	onMount(async () => {
		if (!$signedIn) return goto('/signin');
		// Load user info
		await new Promise((r) => setTimeout(r, 1000));
		$userDetails = {
			profilePicture: 'https://placeimg.com/80/80/people',
			email: 'john.doe@example.com',
			firstname: 'John',
			lastname: 'Doe'
		};
	});
</script>

{#if $userDetails}
	<slot />
{:else}
	<div class="hero h-[80vh]">
		<Wave color="grey" />
	</div>
{/if}
