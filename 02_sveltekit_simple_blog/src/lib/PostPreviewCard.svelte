<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let imgSrc: string;
	export let postId: number;
</script>

<a
	class="card w-50 bg-base-100 shadow-xl hover:brightness-110 transition-all"
	href={'/app/posts/' + postId}
>
	<figure>
		<img src={imgSrc} alt="Preview" class="h-24 w-full object-cover bg-neutral" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{subtitle}</p>
	</div>
</a>
