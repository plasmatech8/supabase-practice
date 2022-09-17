<script lang="ts">
	export let imageSrc: string = '';
	export let firstname: string = 'A';
	export let size = 16;
</script>

<div class="avatar">
	<div class="w-{size} rounded-full">
		{#if imageSrc}
			<img src={imageSrc} alt="avatar" />
		{:else}
			<span class="text-3xl">{firstname?.[0] ?? 'A'}</span>
		{/if}
	</div>
</div>
