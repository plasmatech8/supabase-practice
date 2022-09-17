<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/Avatar.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	const postId = parseInt($page.params.id);
	let post: PostInfo = {
		title: 'Post ' + String.fromCharCode(65 + postId),
		subtitle: 'An awesome discussion about ' + String.fromCharCode(65 + postId),
		imgSrc: 'https://placeimg.com/200/100/arch?v=' + postId,
		postId: postId,
		content: `# heading 1\nfoo bar baz\n## heading 2\n- one\n- two\n- three`,
		author: {
			imgSrc: 'https://placeimg.com/192/192/people',
			firstname: 'Lindy'
		}
	};
</script>

<div class="container mx-auto">
	<div class="hero h-64 card mb-5" style="background-image: url({post.imgSrc});">
		<div class="hero-overlay bg-opacity-60" />
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">{post.title}</h1>
				<p class="mb-5">
					{post.subtitle}
				</p>
			</div>
			<div class="absolute top-8 right-4 flex flex-col gap-3 justify-end place-items-end">
				<a class="btn btn-primary gap-2" href={`${postId}/edit`}><i class="fas fa-pencil" />Edit</a>
				<div class="flex items-center gap-3">
					<div>Written by {post.author.firstname}</div>
					<Avatar {...post.author} />
				</div>
			</div>
		</div>
	</div>
	<div class="card min-w-full shadow-md bg-base-100 mx-aut prose">
		<div class="card-body">
			<SvelteMarkdown source={post.content} />
		</div>
	</div>
</div>
