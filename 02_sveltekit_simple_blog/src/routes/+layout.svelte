<script>
	import AppBar from '$lib/AppBar.svelte';
	import '@fortawesome/fontawesome-free/js/all';
	import '../app.postcss';
</script>

<div>
	<header class="sticky top-0 z-50 rounded-lg mb-4">
		<nav>
			<AppBar />
		</nav>
	</header>
	<main class="p-3">
		<slot />
	</main>
	<footer />
</div>
