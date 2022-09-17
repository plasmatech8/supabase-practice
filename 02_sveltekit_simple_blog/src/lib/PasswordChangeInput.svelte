<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let password = '';
	let password2 = '';
	$: password1Error = checkPassword(password);
	$: password2Error = checkPasswordMatch(password, password2);
	$: passwordsMatch = password === password2;
	$: password, (password2 = '');
	$: password,
		password2,
		dispatch('change', {
			password: password,
			valid: !password || !password2 || !!password1Error || !!password2Error || !passwordsMatch
		});

	function checkPassword(pw: string) {
		// Minimum eight characters, at least one letter and one number
		if (!/\d/.test(pw)) return 'Must contain at least one number';
		if (!/[a-zA-Z]/.test(pw)) return 'Must contain at least one letter';
		if (!/.{8,}/.test(pw)) return 'Minimum eight characters';
		return '';
	}
	function checkPasswordMatch(pw1: string, pw2: string) {
		return pw1 !== pw2 ? 'Passwords do not match' : '';
	}
</script>

<div class="form-control">
	<label for="password1">New Password</label>
	<input
		type="password"
		placeholder="Type password"
		class="input input-primary placeholder:opacity-60"
		id="password1"
		required
		bind:value={password}
		class:input-error={password1Error && password}
	/>
	<label for="password1" class="text-error h-1">{password && password1Error}</label>
</div>
<div class="form-control">
	<label for="password2">Repeat New Password</label>
	<input
		type="password"
		placeholder="Type password"
		class="input input-primary placeholder:opacity-60"
		id="password2"
		required
		bind:value={password2}
		class:input-error={password2Error && password2}
	/>
	<label for="password2" class="text-error h-1">{password2 && password2Error}</label>
</div>
