<script>
	let { nome, data } = $props();
</script>

<section class="max-w-screen -my-2.5 h-full bg-black/50 px-6 py-4">
	<h3 class="text-shadow text-shadow-black mb-3 text-3xl font-bold text-white">{nome}</h3>
	<section class="flex gap-10">
		{#each data as playlist}
			<article class="text-shadow-xs text-shadow-black w-52 text-xs text-white">
				<img
					src={playlist.src}
					alt="imagem da playlist {playlist.nome}"
					class="shadow-xl shadow-black"
				/>
				<h5 class="mt-0.5 text-sm font-bold">{playlist.nome}</h5>
				<div class="-mt-1 flex w-full items-center justify-between">
					<p class="text-xs font-semibold">{playlist.artista}</p>
					<p class="opacity-75">{playlist.data}</p>
				</div>
			</article>
		{/each}
	</section>
</section>
