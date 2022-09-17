<script lang="ts">
	import PasswordChangeInput from '$lib/PasswordChangeInput.svelte';

	let password = '';
	let valid = false;
	function updatePassword() {
		alert('Reset link sent');
	}
</script>

<div class="container mx-auto">
	<div class="prose mb-10">
		<h1>Forgot Password</h1>
	</div>
	<form on:submit|preventDefault={updatePassword} class="flex flex-col gap-6 mb-5">
		<PasswordChangeInput
			bind:password
			on:change={(e) => {
				password = e.detail.password;
				valid = e.detail.valid;
			}}
		/>
		<button type="submit" class="btn btn-primary w-fit" disabled={valid}> Update </button>
	</form>
</div>
