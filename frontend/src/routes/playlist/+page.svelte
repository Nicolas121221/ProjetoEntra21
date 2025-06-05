<script>
	import Nav from '$lib/components/Nav.svelte';
	import Background from '$lib/components/Background.svelte';
	import List from '$lib/components/List.svelte';

	const playlists = Array.from({ length: 12 }, (_, i) => ({
		id: i + 1,
		name: `Playlist ${i + 1}`
	}));

class Song{
	constructor(nome, data, src, artista){
		this.nome = nome
		this.data = data
		this.src = src
		this.artista = artista
	}
}

const data = [
	{} = new Song("MTV Unplugged",'23/05/2025', "https://th.bing.com/th/id/R.fc9c48fe73f7d89bcec6e3990d886981?rik=0HQhtvKpIib0gg&pid=ImgRaw&r=0", 'Nirvana'),
	]

</script>

<Nav />
<Background />
<main class="mt-14 gap-5 flex flex-col">
	<List nome='Playlist' data={data}/>
	<List nome='Álbuns' data={data}/>
	<List nome='Popular' data={data}/>
</main>