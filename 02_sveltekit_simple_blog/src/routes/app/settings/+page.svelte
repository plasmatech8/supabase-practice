<script lang="ts">
	import PasswordChangeInput from '$lib/PasswordChangeInput.svelte';

	import { userDetails } from '$lib/stores';
	import { cloneDeep, isEqual } from 'lodash';
	import { derived } from 'svelte/store';

	// Profile Picture
	let profilePicture: any;
	function updateProfilePicture() {
		console.log(profilePicture);
		profilePicture = undefined;
	}

	// User Profile Information
	const currentUserDetails = derived(userDetails, (d) => d as UserInfo);
	let newUserDetails: UserInfo = cloneDeep($currentUserDetails);
	$: profileChanged = isEqual($currentUserDetails, newUserDetails);
	$: profileValid = checkProfile(newUserDetails);

	function checkProfile(pr: UserInfo) {
		return pr.email && pr.firstname && pr.lastname;
	}
	function updateProfile() {
		$userDetails = cloneDeep(newUserDetails);
		console.log($currentUserDetails);
	}

	// User Password Change
	let password = '';
	let valid = false;
	function updatePassword() {
		console.log(password);
		password = '';
	}
</script>

<div class="container mx-auto">
	<div class="prose mb-6">
		<h1>Settings</h1>
	</div>

	<div class="card max-w-2xl shadow-2xl bg-base-100 mx-auto">
		<div class="card-body">
			<!-- Profile Picture -->
			<h2 class="card-title mb-2">Profile Picture</h2>
			<form on:submit|preventDefault={updateProfilePicture} class="flex flex-col gap-6 mb-5">
				<input
					class="input input-primary"
					id="file_input"
					type="file"
					bind:value={profilePicture}
				/>
				<button type="submit" class="btn btn-primary w-fit" disabled={!profilePicture}>
					Update
				</button>
			</form>
			<!-- Change Profile -->
			<h2 class="card-title mb-2">User Details</h2>
			<form on:submit|preventDefault={updateProfile} class="flex flex-col gap-6 mb-5">
				<div class="form-control">
					<label for="firstname">Email</label>
					<input
						type="text"
						placeholder="e.g. john.doe@example.com"
						class="input input-primary placeholder:opacity-60 invalid:input-error"
						id="firstname"
						disabled
						bind:value={newUserDetails.email}
					/>
				</div>
				<div class="form-control">
					<label for="firstname">First name</label>
					<input
						type="text"
						placeholder="e.g. John"
						class="input input-primary placeholder:opacity-60 invalid:input-error"
						id="firstname"
						required
						bind:value={newUserDetails.firstname}
					/>
					<label for="lastname" class="text-error h-1">
						{!newUserDetails.firstname ? 'Please fill out this field' : ''}
					</label>
				</div>
				<div class="form-control">
					<label for="lastname">Last name</label>
					<input
						type="text"
						placeholder="e.g. Doe"
						class="input input-primary placeholder:opacity-60 invalid:input-error"
						id="lastname"
						required
						bind:value={newUserDetails.lastname}
					/>
					<label for="lastname" class="text-error h-1">
						{!newUserDetails.lastname ? 'Please fill out this field' : ''}</label
					>
				</div>
				<button
					type="submit"
					class="btn btn-primary w-fit"
					disabled={profileChanged || !profileValid}
				>
					Update
				</button>
			</form>
			<!-- Change Password -->
			<h2 class="card-title mb-2">Change Password</h2>
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
	</div>
</div>
