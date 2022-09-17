<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from './Avatar.svelte';
	import { signedIn, userDetails } from './stores';

	function signOut() {
		$signedIn = false;
		$userDetails = undefined;
		goto('/');
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1 gap-2 navbar-start">
		<a class="btn btn-ghost normal-case text-xl gap-3" href="/">
			<i class="fa-solid fa-sailboat text-2xl" />
			Blog
		</a>
		{#if $signedIn}
			<a class="btn btn-ghost normal-case text-md gap-3" href="/app/posts">
				<i class="fa-solid fa-book" />
				Posts
			</a>
			<a class="btn btn-ghost normal-case text-md gap-3" href="/app/new">
				<i class="fa-solid fa-square-plus" />
				New
			</a>
		{/if}
	</div>
	<div class="flex-none gap-2 navbar-end">
		{#if $signedIn && $userDetails}
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar" for="">
					<Avatar
						firstname={$userDetails.firstname}
						imageSrc={$userDetails.profilePicture}
						size={10}
					/>
				</label>
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li><a href="/app/settings">Settings</a></li>
					<li>
						<span on:click={signOut}>Sign out</span>
					</li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-ghost normal-case gap-3" href="/signin">
				<i class="fa-solid fa-arrow-right-to-bracket" /> Sign In
			</a>
		{/if}
	</div>
</div>
