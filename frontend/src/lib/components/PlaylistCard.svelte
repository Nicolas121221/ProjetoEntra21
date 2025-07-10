<script>
    import Close from "$lib/svg/Close.svelte";
    import Chevron from "$lib/svg/Chevron.svelte";
    import Elipsis from "$lib/svg/Elipsis.svelte";
    import { onMount } from "svelte";

    let chevron = $state(false);
    let close = $state(false);

    async function saveChanges() {
        edit = false;
        try {
            const res = fetch();
        } catch (e) {
            console.error(e);
        }
    }

    let minutes = $state(1);
    let seconds = $state(1);

    function formataTempo(num) {
        let value = num;
        if (!num) value = 0;
        if (num > 59) value = 59;
        if (num < 0) value = 0;
        return (num = value);
    }

    let {
        num,
        musica,
        bpm,
        tom,
        afinacao,
        duracao,
        data,
        data2,
        src,
        album,
        artista,
        artistaUrl,
        compasso,
    } = $props();

    function formataData(data) {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    }

    function formataDuracao(duracao) {
        const duracaoObj = new Date(duracao);
        return duracaoObj.toLocaleTimeString("pt-br", {
            hour12: false,
            second: "2-digit",
            minute: "numeric",
            hours: false,
        });
    }

    let chords = $state();

    async function getChords() {
        try {
            if (!musica || !artista)
                return (chords = "Sem informações para buscar a cifra");

            let data = await fetch(
                `http://localhost:3000/cifra/${artista}/${musica}`
            );
            if (data) {
                return (chords = await data.json());
            } else {
                return (chords = "Não foi possível encontrar a cifra");
            }
        } catch (error) {
            console.error(error);
            return (chords = "Nenhuma Cifra encontrada");
        }
    }

    let edit = $state(false);
</script>

<div
    class="h-13 shadow-xs mt-0.5 flex items-center justify-between gap-1 bg-zinc-700 text-white shadow-blue-600/20 {close
        ? 'hidden'
        : ''}"
    id="el"
>
    <div
        class="flex h-full w-10 items-center justify-center border-r-2 border-r-zinc-900 text-xl"
    >
        {num}
    </div>
    <div class="flex h-full w-[40%] items-center border-r-2 border-r-zinc-900">
        <img
            {src}
            alt="capa do album {album} por {artista}"
            class="mr-2 size-10"
        />
        <div class="flex w-full flex-col justify-center">
            <div class="flex items-center justify-between">
                <div class="-mb-2 flex items-center justify-center">
                    <img
                        src={artistaUrl}
                        alt="foto do artista {artista}"
                        class="mr-2 size-4 rounded-full"
                    />
                    <h5 class="text-xs font-bold">{artista}</h5>
                    <p class="text-xs ml-1">- {album}</p>
                </div>
                <div
                    class="mr-2 justify-self-end text-right text-sm text-white/60"
                >
                    {formataData(data)}
                </div>
            </div>
            <div class="font-sans text-xl font-bold">{musica}</div>
        </div>
    </div>
    <div
        class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
    >
        {bpm}
    </div>
    <div
        class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
    >
        {tom}
    </div>
    <div
        class="flex h-full w-[10%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
    >
        {afinacao}
    </div>
    <div
        class="flex h-full w-[7.5%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
    >
        {formataDuracao(duracao)}
    </div>
    <div
        class="flex h-full w-[13%] items-center justify-center border-r-2 border-r-zinc-900 text-lg"
    >
        {formataData(data2)}
    </div>
    <div class="flex h-full w-[13%] items-center justify-evenly text-lg">
        <button
            onclick={() => {
                if (!chords) getChords();
                chevron = !chevron;
            }}
            class="{chevron ? 'rotate-z-90' : 'rotate-0'} duration-75"
        >
            <Chevron />
        </button>
        <button class="size-6" onclick={() => (close = !close)}>
            <Close />
        </button>
        <button onclick={() => (edit = !edit)}>
            <Elipsis />
        </button>
    </div>
</div>
<div
    class="{chevron
        ? 'h-[75vh]'
        : 'h-0'} w-full bg-zinc-700/90 transition-all duration-300"
>
    {#if chords}
        <section
            class="font-ligth h-[75vh] w-full flex flex-col overflow-y-scroll p-5 font-mono text-sm text-white {!chevron
                ? 'hidden'
                : ''} "
        >
            <pre class="flex">
             <div>{@html chords.letras}</div>
			<div class="flex ml-50 gap-10 flex-col">{@html chords.tablaturas}</div>
		</pre>
        </section>
    {:else}
        <section class="mx-auto pt-20 {!chevron ? 'hidden' : ''} ">
            <div
                class="mx-auto size-7 animate-spin rounded-full border-2 border-white/30 border-b-blue-700"
            ></div>
            <p class="text-center text-2xl text-white">Carregando</p>
        </section>
    {/if}
</div>

{#if edit}
    <section
        class="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-zinc-950/50"
    >
        <div
            class="w-5xl h-[700px] rounded-xl border border-blue-400/50 bg-zinc-950 p-10 text-white"
        >
            <div class="mb-5 flex w-full items-center justify-between">
                <h3 class="ml-4 text-2xl font-bold capitalize text-white">
                    Editor
                </h3>
                <button
                    onclick={() => (edit = !edit)}
                    class="-ml-8 inline h-8 w-8 text-right hover:bg-red-600"
                >
                    <Close />
                </button>
            </div>

            <hr class="mb-5 w-full bg-white opacity-30" />
            <form action="" class="grid h-[60%] grid-cols-3">
                <div>
                    <label for="musica">Música: </label><br />
                    <input
                        type="text"
                        name="musica"
                        bind:value={musica}
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    />
                </div>

                <div>
                    <label for="album">Album: </label><br />
                    <input
                        type="text"
                        name="musica"
                        bind:value={album}
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    />
                </div>

                <div>
                    <label for="artista">Artista: </label><br />
                    <input
                        type="text"
                        name="musica"
                        bind:value={artista}
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    />
                </div>
                <div>
                    <label for="compasso">Compasso: </label><br />
                    <select
                        name="compasso"
                        bind:value={compasso}
                        class="rounded-xs w-[60%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    >
                        <option value="12/8">12/8</option>
                        <option value="9/8">9/8</option>
                        <option value="7/8">7/8</option>
                        <option value="6/8">6/8</option>
                        <option value="5/8">5/8</option>
                        <option value="3/8">3/8</option>
                        <option value="6/4">6/4</option>
                        <option value="5/4">5/4</option>
                        <option value="4/4">4/4</option>
                        <option value="3/4">3/4</option>
                        <option value="2/4">2/4</option>
                    </select>
                </div>

                <div>
                    <label for="bpm">bpm: </label><br />
                    <input
                        type="number"
                        bind:value={bpm}
                        onchange={() => {
                            if (!bpm) return (bpm = 60);
                            if (typeof bpm === "string") return (bpm = 60);
                            if (bpm < 40) return (bpm = 40);
                            if (bpm >= 400) return (bpm = 400);
                        }}
                        class="rounded-xs w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                        min="21"
                        pattern="\d*"
                    />
                </div>

                <div>
                    <label for="duracao">Duração: </label><br />
                    <input
                        type="number"
                        max="60"
                        min="0"
                        placeholder="0"
                        class="rounded-xs w-[38%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                        onchange={formataTempo(minutes)}
                        bind:value={minutes}
                    />
                    :
                    <input
                        type="number"
                        max="59"
                        min="0"
                        placeholder="0"
                        class="rounded-xs w-[38%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                        onchange={formataTempo(seconds)}
                        bind:value={seconds}
                    />
                </div>
                <div>
                    <label for="afinacao">Afinação: </label><br />
                    <input
                        name="afinacao"
                        type="text"
                        bind:value={afinacao}
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    />
                </div>
                <div>
                    <label for="data">Data de lançamento: </label><br />
                    <input
                        name="afinacao"
                        type="date"
                        bind:value={data}
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                    />
                </div>
                <div>
                    <label for="tom">Tom: </label><br />
                    <select
                        name="tom"
                        class="rounded-xs mt-1 w-[80%] border border-blue-400/80 bg-gray-950 py-1 pl-4 active:outline-none"
                        bind:value={tom}
                    >
                        <option value="A">A</option>
                        <option value="Bb">Bb</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="Db">Db</option>
                        <option value="D">D</option>
                        <option value="Eb">Eb</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="F#">F#</option>
                        <option value="G">G</option>
                        <option value="Ab">Ab</option>
                        <option value="Am">Am</option>
                        <option value="Bbm">Bbm</option>
                        <option value="Bm">Bm</option>
                        <option value="Cm">Cm</option>
                        <option value="Dbm">Dbm</option>
                        <option value="Dm">Dm</option>
                        <option value="Ebm">Ebm</option>
                        <option value="Em">Em</option>
                        <option value="Fm">Fm</option>
                        <option value="F#m">F#m</option>
                        <option value="Gm">Gm</option>
                        <option value="Abm">Abm</option>
                    </select>
                </div>
            </form>
            <button
                class="mr-3 mt-20 inline-block cursor-pointer rounded-full border border-green-400 px-4 py-1 text-green-400 hover:bg-green-800"
                onclick={saveChanges}
            >
                <p>Salvar alterações</p>
            </button>
            <button
                class=" inline-block cursor-pointer rounded-full border border-red-400 px-4 py-1 text-red-400 hover:bg-red-800"
                onclick={() => {
                    edit = !edit;
                }}
            >
                <p>Sair</p>
            </button>
        </div>
    </section>
{/if}

<style>
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #74747400;
    }

    ::-webkit-scrollbar-thumb {
        background: #bbbbbb59;
    }
</style>
