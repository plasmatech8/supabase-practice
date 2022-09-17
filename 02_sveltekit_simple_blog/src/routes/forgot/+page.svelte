<script lang="ts">
	let email = '';
	function sendResetPassword() {
		alert('Reset link sent');
	}
</script>

<div class="container mx-auto">
	<div class="prose">
		<h1>Forgot Password</h1>
		<form on:submit|preventDefault={sendResetPassword}>
			<div class="flex flex-col gap-2">
				<label for="email">Email address:</label>
				<input
					id="email"
					type="email"
					placeholder="Enter your email address..."
					class="input input-primary placeholder:opacity-60 invalid:input-error"
					bind:value={email}
					required
				/>
				<div class="flex justify-end mt-5">
					<button class="btn btn-primary">Send Reset Link</button>
				</div>
			</div>
		</form>
	</div>
</div>
