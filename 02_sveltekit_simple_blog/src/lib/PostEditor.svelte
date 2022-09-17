<script lang="ts">
	export let post = {
		title: '',
		subtitle: '',
		content: ''
	};
	export let file: any;
</script>

<div class="flex flex-col gap-5">
	<label for="preview">Preview Image</label>
	<input class="input input-primary" id="preview" type="file" bind:value={file} />
	<label for="title">Title</label>
	<input
		type="text"
		class="input input-primary placeholder:opacity-60"
		id="title"
		placeholder="Post title..."
		bind:value={post.title}
	/>
	<label for="subtitle">Subtitle</label>
	<input
		type="text"
		class="input input-primary placeholder:opacity-60"
		id="subtitle"
		placeholder="Post subtitle..."
		bind:value={post.subtitle}
	/>
	<label for="content">content</label>
	<textarea
		id="content"
		class="textarea textarea-primary w-full placeholder:opacity-60 min-h-[20vh]"
		placeholder="Write your post here..."
		bind:value={post.content}
	/>
</div>
