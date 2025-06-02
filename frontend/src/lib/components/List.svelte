<script>
	let { nome, data } = $props();
</script>

<section class="m-1 w-screen h-[25%] p-5 bg-zinc-950/80 pb-0">
	<h3 class="mb-3 text-3xl font-bold text-white">{nome}</h3>
	<div class="flex text-sm text-white overflow-x-scroll gap-10">
		{#each data as song}
			<article class="flex flex-col min-w-43 h-fit p-3">
				<img src={song.src} class="h-40 w-40 rounded" alt="Imagem da Playlists" />
				<h5 class="text-lg text-white font-semibold">{song.nome} </h5>
                <p class="text-sm font-normal -mt-2">{song.artista}</p><p class=" text-xs text-white/50">{song.data}</p>
			</article>
		{/each}
	</div>
</section>
