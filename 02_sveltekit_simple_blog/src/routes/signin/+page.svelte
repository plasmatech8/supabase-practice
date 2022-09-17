<script lang="ts">
	import { goto } from '$app/navigation';
	import DiscordLoginButton from '$lib/auth/DiscordLoginButton.svelte';
	import FacebookLoginButton from '$lib/auth/FacebookLoginButton.svelte';
	import GithubLoginButton from '$lib/auth/GithubLoginButton.svelte';
	import GoogleLoginButton from '$lib/auth/GoogleLoginButton.svelte';
	import { signedIn } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => $signedIn && goto('/app'));

	function login() {
		$signedIn = true;
		goto('/app');
	}
</script>

<div class="hero min-h-screen">
	<div class="hero-content flex-col lg:gap-16 lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="flex flex-col w-full border-opacity-50">
					<!-- Email & Password -->
					<div>
						<div class="form-control">
							<label class="label" for="">
								<span class="label-text">Email</span>
							</label>
							<input type="text" placeholder="email" class="input input-bordered" />
						</div>
						<div class="form-control">
							<label class="label" for="">
								<span class="label-text">Password</span>
							</label>
							<input type="text" placeholder="password" class="input input-bordered" />
							<label class="label" for="">
								<a href="/forgot" class="label-text-alt link link-hover">Forgot password?</a>
							</label>
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary" on:click={login}>Login</button>
						</div>
					</div>
					<div class="divider">OR</div>
					<!-- Federated Login Options -->
					<div class="flex gap-2 justify-center">
						<GoogleLoginButton on:click={login} />
						<FacebookLoginButton on:click={login} />
						<GithubLoginButton on:click={login} />
						<DiscordLoginButton on:click={login} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
