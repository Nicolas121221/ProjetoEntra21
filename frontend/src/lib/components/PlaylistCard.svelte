<script>
	import Close from '$lib/svg/Close.svelte';
	import Chevron from '$lib/svg/Chevron.svelte';
	import Elipsis from '$lib/svg/Elipsis.svelte';
	import { onMount } from 'svelte';

	let chevron = $state(false);
	let close = $state(false);

	let {
		num,
		musica,
		bpm,
		tom,
		afinacao,
		duracao,
		data,
		data2,
		dataAlbum,
		src,
		album,
		artista,
		artistaUrl
	} = $props();

	function formataData(data) {
		const dataObj = new Date(data);
		return dataObj.toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
	}

	function formataDuracao(duracao) {
		const duracaoObj = new Date(duracao);
		return duracaoObj.toLocaleTimeString('pt-br', {
			hour12: false,
			second: '2-digit',
			minute: 'numeric',
			hours: false
		});
	}

	let response = $state();

	async function getChords() {
		try {
			if (!musica || !artista) return response = 'Sem informações para buscar a cifra';

			let data = await fetch(`http://localhost:3000/cifra/${artista}/${musica}`);
			if (data) {
				return response = await data.json()
			} else {
				return response = 'Não foi possível encontrar a cifra'
			}
		} catch (error) {
			console.error(error);
			return (response = 'Nenhuma Cifra encontrada');
		}
	}

	onMount(getChords);
</script>

<div
	class="h-13 shadow-xs mt-0.5 flex items-center justify-between gap-1 bg-zinc-700 text-white shadow-blue-600/20 {close
		? 'hidden'
		: ''}"
		id="el"
>
	<div class="flex h-full w-10 items-center justify-center border-r-2 border-r-zinc-900 text-xl">
		{num}
	</div>
	<div class="flex h-full w-[40%] items-center border-r-2 border-r-zinc-900">
		<img {src} alt="capa do album {album} por {artista}" class="mr-2 size-10" />
		<div class="flex w-full flex-col justify-center">
			<div class="flex items-center justify-between">
				<div class="-mb-2 flex items-center justify-center">
					<img src={artistaUrl} alt="foto do artista {artista}" class="mr-2 size-4 rounded-full" />
					<h5 class="text-xs font-bold">{artista}</h5>
					<p class="text-xs">- {album}</p>
				</div>
				<div class="mr-2 justify-self-end text-right text-sm text-white/60">
					{formataData(data)}
				</div>
			</div>
			<div class="font-sans text-xl font-bold">{musica}</div>
		</div>
	</div>
	<div
		class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
	>
		{bpm}
	</div>
	<div
		class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
	>
		{tom}
	</div>
	<div class="flex h-full w-[10%] items-center justify-center border-r-2 border-r-zinc-900 text-lg">
		{afinacao}
	</div>
	<div
		class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
	>
		{formataDuracao(duracao)}
	</div>
	<div class="flex h-full w-[13%] items-center justify-center border-r-2 border-r-zinc-900 text-lg">
		{formataData(data2)}
	</div>
	<div class="flex h-full w-[13%] items-center justify-evenly text-lg">
		<button
			onclick={() => {
				chevron = !chevron;
			}}
			class='{chevron ? 'rotate-z-90' : 'rotate-0'} duration-75'
		>
			<Chevron />
		</button>
		<button class="size-6" onclick={() => (close = !close)}>
			<Close />
		</button>
		<button>
			<Elipsis />
		</button>
	</div>
</div>
<div class="{chevron ? 'h-[75vh]' : 'h-0'} w-full bg-zinc-700/90 transition-all duration-300">
	{#if response}
		<section
			class="font-ligth h-[75vh] w-full overflow-y-scroll p-5 font-mono text-sm text-white grid-cols-2 grid gap-x-6 gap-y-0 {!chevron
				? 'hidden'
				: ''} ">
			{#each response as res}
					<article >
					<h6>[{@html res.title}]</h6>
					<pre>{@html res.content}</pre>
				</article>
			{/each}
	</section>
	{:else}
		<section class="mx-auto pt-20 {!chevron ? 'hidden' : ''} ">
			<div
				class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
			></div>
			<p class="text-center text-2xl text-white">Carregando</p>
		</section>
	{/if}
</div>