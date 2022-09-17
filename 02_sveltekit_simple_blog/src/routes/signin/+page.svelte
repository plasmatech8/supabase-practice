<script lang="ts">
	import { goto } from '$app/navigation';
	import DiscordLoginButton from '$lib/auth/DiscordLoginButton.svelte';
	import FacebookLoginButton from '$lib/auth/FacebookLoginButton.svelte';
	import GithubLoginButton from '$lib/auth/GithubLoginButton.svelte';
	import GoogleLoginButton from '$lib/auth/GoogleLoginButton.svelte';
	import { onMount } from 'svelte';

	import supabase from '$lib/supabase';

	onMount(() => {
		const user = supabase.auth.user(); // same as importing the user store
		if (user) goto('/app');
	});

	let email: string;
	let password: string;
	let errorMessage: string;

	async function signInWithEmail() {
		const { user, error } = await supabase.auth.signIn({ email, password });
		if (user) {
			goto('/app');
		}
		if (error) {
			errorMessage = error.message;
		}
	}

	async function signUpWithEmail() {
		const { user, error } = await supabase.auth.signUp({ email, password });
		if (user) {
			console.log(supabase.auth.user());
			// Now you need to show the user "please check email for confirmation link"
		}
		if (error) {
			errorMessage = error.message;
		}
	}

	async function signUpWithGoogle() {
		const { user, session, error } = await supabase.auth.signIn({ provider: 'google' });
		console.log({ user, session, error });
		if (user) {
			console.log(supabase.auth.user());
		}
		if (error) {
			errorMessage = error.message;
		}
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
							<input
								type="text"
								placeholder="email"
								class="input input-bordered"
								bind:value={email}
							/>
						</div>
						<div class="form-control">
							<label class="label" for="">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								class="input input-bordered"
								bind:value={password}
							/>
							<label class="label" for="">
								<a href="/forgot" class="label-text-alt link link-hover">Forgot password?</a>
							</label>
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary mb-3" on:click={signInWithEmail}>Login</button>
							<button class="btn btn-primary" on:click={signUpWithEmail}>Register</button>
							{#if errorMessage}
								<div class="alert alert-error shadow-lg mt-5">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="stroke-current flex-shrink-0 h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
											/></svg
										>
										<span>{errorMessage}</span>
									</div>
								</div>
							{/if}
						</div>
					</div>
					<div class="divider">OR</div>
					<!-- Federated Login Options -->
					<div class="flex gap-2 justify-center">
						<GoogleLoginButton on:click={signUpWithGoogle} />
						<FacebookLoginButton />
						<GithubLoginButton />
						<DiscordLoginButton />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
