<script lang="ts">
	import { page } from '$app/stores';
	import PostEditor from '$lib/PostEditor.svelte';
	import { onMount } from 'svelte';

	const postId = parseInt($page.params.id);
	let post: PostEdit | undefined;
	let file: any;

	onMount(() => {
		post = {
			title: 'Post ' + String.fromCharCode(65 + postId),
			subtitle: 'An awesome discussion about ' + String.fromCharCode(65 + postId),
			imgSrc: 'https://placeimg.com/200/100/arch?v=' + postId,
			content: `# heading 1\nfoo bar baz\n## heading 2\n- one\n- two\n- three`
		};
	});

	function submitPost() {
		console.log(file);
		console.log(post);
	}
</script>

<div class="container mx-auto">
	<div class="prose mb-5">
		<h1>Edit Post</h1>
	</div>
	<form on:submit|preventDefault={submitPost}>
		<PostEditor bind:post bind:file />
		<div class="flex justify-end mt-5">
			<button class="btn btn-primary">Update</button>
		</div>
	</form>
</div>
