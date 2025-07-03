<script>
    import { page } from "$app/state";
    import Background from "$lib/components/Background.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { onMount } from "svelte";

    let artist = $state();
    let data = $state();
    let chords = $state("");
    let albuns = $state("a");
    onMount(async () => {
        try {
            data = "";
            chords = "";
            albuns = "";
            let res = await fetch(
                `http://localhost:3000/spotify/album/${page.params.id}`
            );
            if (res) data = await res.json();
            res = await fetch(
                `http://localhost:3000/spotify/artist/${data.artists[0].id}`
            );
            artist = await res.json();
            const cifra = await fetch(
                `http://localhost:3000/cifra/${data.artists[0].name}/${data.name}`
            );

            res = await fetch(
                `http://localhost:3000/spotify/artist/${data.artists[0].id}/album`
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

    function setDuration(ms) {
        let date = new Date(ms);
        return date.toLocaleTimeString("pt-BR", {
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "UTC",
        });
    }
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
        <section class="ml-70 h-90 flex pt-20">
            <div class="pl-40">
                <img
                    src={data.images[0].url}
                    alt="blur da imagem do album"
                    class="aspect-square min-h-60 min-w-60 size-60 blur-md animate-pulse"
                />
                <img
                    src={data.images[0].url}
                    alt="imagem do album"
                    class="relative -mt-60 aspect-square min-h-60 min-w-60 size-60 shadow-2xl shadow-black/20"
                />
            </div>
            <div class="text-shadow-xs text-shadow-black pl-10 pt-36">
                <div class="mt-3 flex gap-2">
                    <img
                        src={artist.images[0].url}
                        class="inline-block size-7 rounded-full shadow"
                        alt=""
                    />
                    <h4 class="inline-block text-2xl font-semibold">
                        {data.artists[0].name} -
                        <span class="text-xl opacity-60"
                            >{data.release_date}</span
                        >
                    </h4>
                </div>
                <h1 class="text-5xl font-bold">{data.name}</h1>
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
        <section class="ml-70">
            <h3 class="text-xl mb-5 ml-40">Músicas</h3>
            <table class="w-[80%] ml-40 bg-gray-900 shadow-xl shadow-black/20 table-auto rounded">
                <thead class="border border-blue-400">
                    <tr
                        class="*:border-blue-400/40 *:border *:px-1.5 text-sm text-white/90 text-semibol bg-gray-950/10"
                    >
                        <td>Nº</td>
                        <td>Nome</td>
                        <td class="text-center">Duração</td>
                        <td class="text-center">Disco</td>
                        <td class="text-center">Spotify</td>
                    </tr>
                </thead>
                <tbody>
                    {#each data.tracks.items as track}
                        <tr
                            class="*:border-blue-400/15 *:border *:px-1.5 hover:bg-white/10"
                        >
                            <td>{track.track_number}</td>
                            <td><a href="/musica/{track.id}" class="hover:underline cursor-pointer">{track.name}</a></td>
                            <td class="text-center"
                                >{setDuration(track.duration_ms)}</td
                            >
                            <td class="text-center">{track.disc_number}</td>
                            <td class="text-center"><a href={track.external_urls.href}><img src="https://logospng.org/download/spotify/logo-spotify-icon-4096.png" alt="Link para a musica do spotify" class="max-h-2"></a></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

        <section class="ml-70 from-gray-950 to-black/5 h-[500px] py-20">
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
                                    src={album.images[0].url}
                                    alt="imagem do album"
                                    class="min-h-40 min-w-40"
                                />
                                <h5 class="text-sm">{album.name}</h5>
                                <p class="text-xs opacity-50">
                                    {album.release_date}
                                </p>
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
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
