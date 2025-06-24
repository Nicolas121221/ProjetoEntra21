<script>
	import Nav from '$lib/components/Nav.svelte';
	import Background from '$lib/components/Background.svelte';
	import List from '$lib/components/List.svelte';

	const playlists = Array.from({ length: 12 }, (_, i) => ({
		id: i + 1,
		name: `Playlist ${i + 1}`
	}));

	class Song {
		constructor(nome, data, src, artista) {
			this.nome = nome;
			this.data = data;
			this.src = src;
			this.artista = artista;
		};
	};

	const data = [
		({} = new Song(
			'MTV Unplugged',
			'23/05/2025',
			'https://th.bing.com/th/id/R.fc9c48fe73f7d89bcec6e3990d886981?rik=0HQhtvKpIib0gg&pid=ImgRaw&r=0',
			'Nirvana'
		))
	];
</script>

<Nav />
<Background />
<aside
	class="w-70 fixed bottom-0 left-0 top-0 z-20 mt-10 border-r border-t border-gray-900 bg-zinc-950/95 pt-4 capitalize text-white"
>
	<h1 class="border-b border-white/20 pb-4 text-center text-3xl font-semibold">Playlists</h1>
</aside>
<main
	class="w-[100% - 280px] ml-70 mt-10 flex h-[95.8vh] flex-col gap-5 overflow-y-scroll bg-zinc-950/70 px-6 py-4"
>
	<List nome="Mais ouvidas" {data} />
	<List nome="Álbuns" {data} />
	<List nome="Popular" {data} />
</main>

<style>
	:global{
		::-webkit-scrollbar {
			width: 14px;
		}
		::-webkit-scrollbar-track {
			background: #74747452;
		}
		::-webkit-scrollbar-thumb {
			background: #bbbbbb8e;
		}
	}
</style>
