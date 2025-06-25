<script>
	import Close from '$lib/svg/Close.svelte';
    import { fade } from 'svelte/transition';

	let { type, duration, message, title } = $props();

	let style = $state();
	let active = $state(true);

	if (type === 'alert') {
		style = 'bg-red-600/50 text-red-300 stroke-red-600';
	} else if (type === 'success') {
		style = 'bg-green-600/50 text-green-300 stroke-green-600';
	} else {
		style = 'bg-blue-600/50 text-blue-300 stroke-blue-300';
	}
</script>

{#if active}
	<article transition:fade({duration:100})
		class="{style} text-shadow-md relative top-10 z-30 mx-auto max-w-sm rounded-md border p-2 my-2 font-bold shadow-md"
	>
		<h2 class="text-lg capitalize">{title}</h2>
		<button
			onclick={() => (active = !active)}
			class="cursor-pointer duration-150 hover:scale-125 absolute corner top-2 right-2"
		>
			<Close />
		</button>
		<p class="font-light">{message}</p>
	</article>
{/if}
