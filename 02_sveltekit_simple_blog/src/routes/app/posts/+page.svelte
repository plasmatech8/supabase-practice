<script lang="ts">
	import PostPreviewCard from '$lib/PostPreviewCard.svelte';

	let postList: PostInfo[] = [...Array(10).keys()].map((i) => ({
		title: 'Post ' + String.fromCharCode(65 + i),
		subtitle: 'An awesome discussion about ' + String.fromCharCode(65 + i),
		imgSrc: 'https://placeimg.com/200/100/arch?v=' + i,
		postId: i,
		content: `# heading 1\nfoo bar baz\n## heading 2\n- one\n- two\n- three`,
		author: {
			imgSrc: 'https://placeimg.com/192/192/people',
			firstname: 'Lindy'
		}
	}));

	let searchQuery: string = '';

	$: filteredPostlist = postList.filter((v) => v.title.includes(searchQuery));
</script>

<div class="container mx-auto">
	<div class="prose">
		<h1>Posts</h1>
	</div>

	<div class="flex justify-center mt-4 mb-6">
		<input
			bind:value={searchQuery}
			type="text"
			placeholder="Search..."
			class="input input-bordered input-primary w-full max-w-xs"
		/>
	</div>

	<div class="flex gap-6 flex-wrap justify-center">
		{#each filteredPostlist as post}
			<PostPreviewCard {...post} />
		{/each}
	</div>
</div>
