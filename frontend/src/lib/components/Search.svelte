<script>
    import Close from "$lib/svg/Close.svelte";
    let { search, data } = $props();
    let searchTrack = $state(true);

    function formataData(data) {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString("pt-BR");
    }
</script>

<div
    class="z-80 fixed inset-0 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/30 transition-opacity duration-300 {!search
        ? 'pointer-events-none opacity-0'
        : 'opacity-100'}"
>
    <div
        class="w-3xl z-10 h-[600px] transform rounded-xl border border-blue-500/50 bg-zinc-950 p-4 transition-all duration-300 {!search
            ? '-translate-y-20 opacity-0'
            : 'translate-y-0 opacity-100'}"
    >
        <div class="flex items-center">
            <h2
                class="mx-auto w-full indent-10 font-bold capitalize text-white"
            >
                Pesquisar
            </h2>
            <button
                onclick={() => (search = "")}
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
                        href="/musica/{song.id}"
                        onclick={() => {
                            search = "";
                        }}
                    >
                        <img
                            src={song.album.images[2].url}
                            alt=""
                            class="size-10"
                        />
                        <div class="flex flex-col">
                            <h5 class="text-base -mb-1">{song.name}</h5>
                            <p class="font-thin text-xs">
                                {song.artists[0].name}
                                <span class="opacity-40"
                                    >{song.album.name} - {formataData(
                                        song.album.release_date
                                    )}</span
                                >
                            </p>
                        </div>
                    </a>
                {/each}
            {:else}
                <section class="mx-auto mt-20 h-full">
                    <div
                        class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
                    ></div>
                    <p class="text-center text-2xl text-white">Carregando</p>
                </section>
            {/if}
        </section>
    </div>
</div>
