<script>
    import { page } from "$app/state";
    import Background from "$lib/components/Background.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { onMount } from "svelte";

    let artist = $state();
    let data = $state();
    let chords = $state("");
    onMount(async () => {
        try {
            let res = await fetch(
                `http://localhost:3000/spotify/song/${page.params.id}`
            );
            if (res) data = await res.json();
            res = await fetch(
                `http://localhost:3000/spotify/artist/${data.artists[0].id}`
            );
            artist = await res.json();
            const cifra = await fetch(
                `http://localhost:3000/cifra/${data.artists[0].name}/${data.name}`
            );
            if (!cifra) {
                return (chords = [
                    { title: "", content: "Nenhuma cifra encontrada" },
                ]);
            } else {
                return (chords = await cifra.json());
            }
        } catch (e) {
            console.error(e);
        }
    });
</script>

<Nav />
<Background />

{#if data && artist}
    <aside
        class="w-70 fixed bottom-0 left-0 top-0 z-20 mt-10 border-r border-t border-blue-400/50 bg-zinc-950/95 pt-4 capitalize text-white"
    >
        <h1
            class="border-b border-blue-400/50 pb-4 text-center text-2xl font-semibold"
        >
            Pesquisas recentes
        </h1>
    </aside>
    <main class="h-screen w-full pt-10 text-white">
        <section class="ml-70 h-90 flex py-20">
            <div class=" pl-40">
                <img
                    src={data.album.images[0].url}
                    alt=""
                    class="aspect-square size-80 blur-xl"
                />
                <img
                    src={data.album.images[0].url}
                    alt=""
                    class="relative -mt-80 aspect-square size-80"
                />
            </div>
            <div class="text-shadow-xs text-shadow-black pl-10 pt-48">
                <h5 class="text-2xl">{data.album.name}</h5>
                <div class="mt-3 flex gap-2">
                    <img
                        src={artist.images[0].url}
                        class="inline-block size-7 rounded-full shadow"
                        alt=""
                    />
                    <h4 class="inline-block text-2xl font-semibold">
                        {data.artists[0].name} -
                        <span class="text-xl opacity-60"
                            >{data.album.release_date}</span
                        >
                    </h4>
                </div>
                <h1 class="text-5xl font-bold">{data.name}</h1>
                <div
                    class="absolute right-10 -mt-5 flex items-center justify-center"
                >
                    <a href={artist.external_urls.spotify} target="_blank">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/016/716/458/original/spotify-icon-free-png.png"
                            alt="Logo do spotify"
                            class="size-6"
                        />
                    </a>
                    <a href={artist.external_urls.spotify} target="_blank">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2319/2319174.png"
                            alt="botão de Configurar"
                            class="size-10"
                        />
                    </a>
                </div>
            </div>
        </section>
        <section class="mt-40 ml-70 from-gray-950 to-black/5 w-full">
            <div class="ml-40">
				<h3 class="text-xl mb-5">Artista</h3>
				<img
					class="rounded-full size-10"
					src={artist.images[0].url}
					alt="imagem do album"
				/>
				<h2 class="text-3xl font-bold">{artist.name}</h2>
				<p class="opacity">Seguidores</p>
				{artist.followers.total.toLocaleString('pt-BR')}
			</div>
        </section>

        <section
            class="ml-70 mt-30 min-h-30 border border-blue-400/50 bg-gray-950/80 p-10"
        >
            <h3 class="mt-5 indent-28 text-5xl font-bold">
                Cifra <a href="https://www.cifraclub.com" target="_blank"
                    ><img
                        src="https://akamai.sscdn.co/cc/img/mobile/icons/apple-touch-icon-76x76.png"
                        alt="Logo do cifraclub"
                        class="inline-block size-8"
                    /></a
                >
            </h3>
            <pre class="ml-30">
				{#if chords.length >= 1}
                    {#each chords as part}
                        <pre>{@html part.title}</pre>
						<pre>{@html part.content}</pre>
                    {/each}
                {:else}
                    <p>Nenhuma cifra encontrada</p>
                {/if}
			</pre>
        </section>
    </main>
{:else}
    <section class="mx-auto flex h-full items-center justify-center">
        <div
            class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
        ></div>
        <p class="text-center text-2xl text-white">Carregando</p>
    </section>
{/if}
