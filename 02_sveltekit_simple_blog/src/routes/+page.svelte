<script lang="ts">
	import supabase from '$lib/supabase';
	const signedIn = supabase.auth.user();
</script>

<div class="hero min-h-[calc(100vh-400px)]">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">My Blog!</h1>
			<p class="py-6">The awesome-est place on the net</p>
			<a class="btn btn-primary" href={signedIn ? '/app/posts' : '/signin'}>Get Started</a>
		</div>
	</div>
</div>
