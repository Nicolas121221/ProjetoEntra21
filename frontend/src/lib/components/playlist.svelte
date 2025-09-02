<script>
    import PlaylistCard from "$lib/components/PlaylistCard.svelte";
    import { onMount } from "svelte";

    let isLoading = $state(false);
    let isHidden = $state(true);
    let songs = $state([]);

    onMount(async () => {
        const response = await fetch("http://localhost:3000/views/Playlist/1");
        songs = await response.json();
        isLoading = true;

    });

</script>

<div
    class="m-2 mb-0 mr-0 h-[98.5%] w-full border border-blue-500/60 rounded bg-zinc-950/90 p-4"
>
    <div class="flex">
        <h2 class="mx-auto text-center text-xl text-white duration-100">
            Playlist
        </h2>
    </div>

    <div class="mt-5 max-h-[80vh]">
        <header class="h-4 bg-zinc-800">
            <ul
                class="text-bold flex select-none items-center justify-between gap-1 text-xs text-gray-400 mr-[17px]"
            >
                <li class="w-10 border-r-2 border-r-zinc-900 text-center pl-1">
                    N°
                </li>
                <li class="w-[40%] border-r-2 border-r-zinc-900">Música</li>
                <li class="w-[7.5%] border-r-2 border-r-zinc-900 text-center">
                    Bpm
                </li>
                <li class="w-[7.5%] border-r-2 border-r-zinc-900 text-center">
                    Tom
                </li>
                <li class="w-[10%] border-r-2 border-r-zinc-900 text-center">
                    Afinação
                </li>
                <li class="w-[7.5%] border-r-2 border-r-zinc-900 text-center">
                    Duração
                </li>
                <li class="w-[13%] border-r-2 border-r-zinc-900 text-center">
                    Adiconado em
                </li>
                <li class="w-[13%] text-center">Opções</li>
            </ul>
        </header>

        {#if !isLoading}
            <section class="mx-auto mt-20">
                <div
                    class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
                ></div>
                <p class="text-center text-2xl text-white">Carregando</p>
            </section>
        {:else}
            <section class="max-h-[85vh] overflow-y-scroll">
                {#each songs as song}
                    <PlaylistCard
                        num={song.musica_id}
                        musica={song.musica_nome}
                        bpm={song.bpm}
                        tom={song.tom_musical}
                        afinacao="Padrão"
                        duracao={song.duracao_formatada}
                        data={song.album_lancamento}
                        data2={song.data_adicao_playlist}
                        src={song.album_cover_url}
                        album={song.album_nome}
                        artista={song.artistas_nomes}
                        artistaUrl={song.artistas_fotos_urls}
                        compasso={song.compasso}
                    />
                {/each}
                <button
                    class="text-lg text-white border border-white/50 w-full h-12 rounded mt-1 hover:bg-white/10 cursor-pointer flex justify-center items-center"
                    ><span class="text-4xl -mt-2 mr-2">&plus;</span>
                    <p>Adicionar à playlist</p></button
                >
            </section>
        {/if}
    </div>
</div>

<style>
    ::-webkit-scrollbar {
        width: 17px;
    }

    ::-webkit-scrollbar-track {
        background: #74747400;
    }

    ::-webkit-scrollbar-thumb {
        background: #bbbbbb64;
    }
</style>
