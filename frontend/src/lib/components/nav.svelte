<script>
	import Hamburguer from '$lib/svg/HamburguerMenu.svelte';
	import Magnifier from '$lib/svg/Magnifier.svelte';
	import Microphone from '$lib/svg/Microphone.svelte';
	import Logo from '$lib/svg/Logo.svelte';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Close from '$lib/svg/Close.svelte';

	let none = $state(true);

	let data = $state();
	let search = $state();
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
		<button onclick={(none = !none)}>
			<Hamburguer />
		</button>
		<div class="sm:w-lg mx-4 flex w-full max-w-96 items-center justify-center sm:max-w-fit">
			<Magnifier />
			<input
				type="search"
				class="border-1 w-xl max-h-8 rounded-r-full border-zinc-600 bg-zinc-800 py-1 pl-2 font-semibold text-gray-100 outline-none outline-1 outline-green-100 selection:bg-blue-400 selection:text-black hover:bg-zinc-700 active:bg-zinc-800"
				placeholder="Qual música você deseja tocar?"
				bind:value={search}
				onkeydown={debouncedFetchSearch}
			/>
			<Microphone />
		</div>

		<div class="text-wh flex gap-4 text-lg text-white">
			<h1 class="font-bold">Rhythm</h1>
			<Logo />
		</div>
	</nav>
</header>

<div
	class="fixed inset-0 z-10 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/30 transition-opacity duration-300 {none
		? 'pointer-events-none opacity-0'
		: 'opacity-100'}"
>
	<div
		class="w-2xl transform z-10 h-[450px] bg-zinc-950 p-4 border-blue-500/60 rounded-lg border transition-all duration-300 {none
			? '-translate-y-20 opacity-0'
			: 'translate-y-0 opacity-100'}"
	>
		<div class="flex items-center">
			<h2 class="mx-auto text-center font-bold capitalize text-white">Menu</h2>
			<button
				onclick={() => (none = !none)}
				class="-ml-8 inline h-8 w-8 text-right hover:bg-red-600"
			>
				<Close />
			</button>
		</div>

		<menu class="mt-5 flex h-[80%] flex-col items-center justify-center gap-6">
			<MenuButton title="Playlists" href="/playlist" />
			<MenuButton title="Configuração" href="/config" />
			<MenuButton title="FAQ" href="/" />
			<MenuButton title="Saiba Mais" href="https://github.com/Nicolas121221/ProjetoEntra21" />
		</menu>
	</div>
</div>

<div
	class="fixed inset-0 z-10 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/30 transition-opacity duration-300 {!search
		? 'pointer-events-none opacity-0'
		: 'opacity-100'}"
>
	<div
		class="w-2xl border-blue-500/60 rounded-lg border z-10 h-[450px] transform bg-zinc-950 p-4 transition-all duration-300 {!search
			? '-translate-y-20 opacity-0'
			: 'translate-y-0 opacity-100'}"
	>
		<div class="flex items-center">
			<h2 class="mx-auto text-center font-bold capitalize text-white">Pesquisar</h2>
			<button
				onclick={() => (search = '')}
				class="-ml-8 inline h-8 w-8 text-right hover:bg-red-600"
			>
				<Close />
			</button>
		</div>
		<section class="h-[90%] w-full overflow-y-scroll">
			{#if data}
				{#each data as song}
					<a
						class="flex w-full cursor-pointer items-center gap-3 border-x-0 border-white/5 p-2 capitalize text-white duration-150 hover:bg-zinc-800"
						href="/{song.id}/musica"
						onclick={()=>{search = ''}}
					>
						<img src={song.album.images[0].url} alt=" " class="size-10" />
						<h5 class="font-semibold">
							{song.name} -
							<span class="text-xs font-thin opacity-50"
								>{song.album.name + ' ' + song.album.release_date}</span
							>
						</h5>
						<div class="text-sm font-normal">{song.artists[0].name}</div>
					</a>
				{/each}
			{:else}
				<section class="mx-auto mt-20">
					<div
						class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
					></div>
					<p class="text-center text-2xl text-white">Carregando</p>
				</section>
			{/if}
		</section>
	</div>
</div>
