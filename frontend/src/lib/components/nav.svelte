<script>
	import Hamburguer from '$lib/svg/HamburguerMenu.svelte';
	import Search from './Search.svelte';
	import Magnifier from '$lib/svg/Magnifier.svelte';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Close from '$lib/svg/Close.svelte';

	let isOpened = $state(false);

	let search = $state();
	let data = $state();

	async function fetchSearch() {
		try {
			data = '';
			const res = await fetch(`http://localhost:3000/spotify/search/1?q=${search}`);
			data = await res.json();
			data = data.tracks.items;
		} catch (e) {
			console.error('Erro na busca:', e);
		}
	}

	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	const debouncedFetchSearch = debounce(fetchSearch, 500);
</script>

<header class="fixed left-0 right-0 top-0 z-20 min-h-10 border-b border-b-blue-500/60 bg-zinc-950">
	<nav class="flex items-center justify-between px-5">
		<button onclick={(isOpened = !isOpened)}>
			<Hamburguer />
		</button>
		<div class="sm:w-lg mx-4 flex w-full max-w-96 items-center justify-center sm:max-w-fit">
			<Magnifier />
			<input
				type="search"
				class="border-1 w-xl max-h-7 rounded-r-full border-zinc-600 bg-zinc-800 py-1 pl-2 font-semibold text-gray-100 outline-none outline-1 outline-green-100 selection:bg-blue-400 selection:text-black hover:bg-zinc-700 active:bg-zinc-800"
				placeholder="Qual música você deseja tocar?"
				bind:value={search}
				onkeydown={debouncedFetchSearch}
			/>
		</div>

		<div class="text-wh flex gap-1 text-lg text-white">
			<h1 class="font-bold">Rhythm</h1>
			<a href="/login" class="block h-full items-center justify-center">
				<img src="/favicon.png" class="size-7 animate-spin" alt="Logo do Rhythm" />
			</a>
		</div>
	</nav>
</header>

<div
	class="fixed inset-0 z-10 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/30 transition-opacity duration-300 {!isOpened
		? 'pointer-events-none opacity-0'
		: 'opacity-100'}"
>
	<div
		class="w-2xl z-10 h-[450px] transform rounded-lg border border-blue-500/60 bg-zinc-950 p-4 transition-all duration-300 {!isOpened
			? '-translate-y-20 opacity-0'
			: 'translate-y-0 opacity-100'}"
	>
		<div class="flex items-center">
			<h2 class="mx-auto text-center font-bold capitalize text-white">Menu</h2>
			<button
				onclick={() => (isOpened = !isOpened)}
				class="-ml-8 inline h-8 w-8 text-right hover:bg-red-600"
			>
				<Close />
			</button>

			&
		</div>

		<menu class="mt-5 flex h-[80%] flex-col items-center justify-center gap-6">
			<MenuButton title="Home" href="/" target="_self" />
			<MenuButton title="Playlists" href="/playlist" target="_self" />
			<MenuButton title="Configurações" href="/config" target="_self" />
			<MenuButton title="Saiba Mais" href="https://github.com/Nicolas121221/ProjetoEntra21"  target="_blank" />
		</menu>
	</div>
</div>

<Search {search} {data} />
