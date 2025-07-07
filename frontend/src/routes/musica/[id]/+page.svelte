<script>
    import { page } from "$app/state";
    import Background from "$lib/components/Background.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { onMount } from "svelte";

    let {data} = $props()


    let artist = $state();
    let objectData = $state();
    let chords = $state("");
    let albuns = $state("a");
    onMount(async () => {
        try {
            objectData = "";
            chords = "";
            albuns = "";
            artist = "";

            let res = await fetch(
                `http://localhost:3000/spotify/song/${page.params.id}`
            );
            if (res) objectData = await res.json();
            res = await fetch(
                `http://localhost:3000/spotify/artist/${objectData.artists[0].id}`
            );
            artist = await res.json();
            const cifra = await fetch(
                `http://localhost:3000/cifra/${objectData.artists[0].name}/${objectData.name}`
            );

            res = await fetch(
                `http://localhost:3000/spotify/artist/${objectData.artists[0].id}/album`
            );
            albuns = await res.json();

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

    function formataData(objectData) {
        const objectDataObj = new Date(objectData);
        return objectDataObj.toLocaleDateString("pt-BR");
    }
</script>

<Nav />
<Background />

{#if objectData && artist}
    <aside
        class="w-70 fixed bottom-0 left-0 top-0 z-20 mt-10 border-r border-t border-blue-400/50 bg-zinc-950/95 pt-4 capitalize text-white"
    >
        <h1
            class="border-b border-blue-400/50 pb-4 text-center text-2xl font-semibold"
        >
            Pesquisas recentes
        </h1>

        {data.search}
    </aside>
    <main class="h-screen w-full pt-10 text-white">
        <section class="ml-70 h-90 flex pt-20">
            <div class="pl-40">
                <img
                    src={objectData.album.images[0].url}
                    alt=""
                    class="aspect-square size-60 blur-md animate-pulse"
                />
                <img
                    src={objectData.album.images[0].url}
                    alt=""
                    class="relative -mt-60 aspect-square size-60 shadow-2xl shadow-black/20"
                />
            </div>
            <div class="text-shadow-xs text-shadow-black pl-10 pt-24">
                <h5 class="text-2xl">
                    <a href="/album/{objectData.album.id}">{objectData.album.name}</a>
                </h5>
                <div class="mt-3 flex gap-2">
                    <img
                        src={artist.images[0].url}
                        class="inline-block size-7 rounded-full shadow"
                        alt=""
                    />
                    <h4 class="inline-block text-2xl font-semibold">
                        {objectData.artists[0].name} -
                        <span class="text-xl opacity-60"
                            >{formataData(objectData.album.release_date)}</span
                        >
                    </h4>
                </div>
                <h1 class="text-5xl font-bold">{objectData.name}</h1>
                <div
                    class="absolute right-40 gap-2 -mt-5 flex items-center justify-center"
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
        <section class="mt-5 ml-70 from-gray-950 to-black/5">
            <div class="ml-40">
                <h3 class="text-xl mb-5">Artista</h3>
                <div class="flex items-center gap-10">
                    <img
                        class="rounded-full size-22"
                        src={artist.images[0].url}
                        alt="imagem do album"
                    />
                    <article>
                        <h2 class="text-3xl font-bold">{artist.name}</h2>
                        <p class="opacity-80">Seguidores</p>
                        {artist.followers.total.toLocaleString("pt-BR")}
                    </article>
                </div>

                <div class="mt-5">
                    <h4 class="text-xl mb-5">Álbuns</h4>
                    <div class="flex gap-2 overflow-x-auto max-w-8xl">
                        {#each albuns.items as album}
                            <a
                                class="flex flex-col bg-black/40 hover:bg-black/50 p-3 rounded-sm shadow-2xl/10 shadow-white duration-75"
                                href="/album/{album.id}"
                            >
                                <img
                                    src={album.images[1].url}
                                    alt="imagem do album"
                                    class="min-h-40 min-w-40"
                                />
                                <h5 class="text-sm">{album.name}</h5>
                                <p class="text-xs opacity-50">
                                    {formataData(album.release_date)}
                                </p>
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <section
            class="ml-70 mt-30 min-h-96 border border-blue-400/50 bg-gray-950/80 p-10"
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
                {:else if chords.length === 0}
                    <p>Nenhuma cifra encontrada</p>
                {:else}
                    <section
                        class="mx-auto flex h-full items-center justify-center">
                    <div
                            class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"></div>
                    <p class="text-center text-2xl text-white">Carregando</p>
                </section>
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

<style>
    ::-webkit-scrollbar {
        width: 10px;
        height: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #74747452;
    }
    ::-webkit-scrollbar-thumb {
        background: #bbbbbb8e;
    }
</style>
