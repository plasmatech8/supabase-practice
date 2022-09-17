<script lang="ts">
	import PostEditor from '$lib/PostEditor.svelte';

	let post: PostEdit | undefined;
	let file: any;

	function submitPost() {
		console.log(file);
		console.log(post);
	}
</script>

<div class="container mx-auto">
	<div class="prose mb-5">
		<h1>New Post</h1>
	</div>
	<form on:submit|preventDefault={submitPost}>
		<PostEditor bind:post bind:file />
		<div class="flex justify-end mt-5">
			<button class="btn btn-primary">Publish</button>
		</div>
	</form>
</div>
