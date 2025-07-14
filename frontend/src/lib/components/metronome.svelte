<script>
    import Settings from "$lib/svg/Settings.svelte";
    import Tempo from "$lib/components/Tempo.svelte";
    import Player from "./Player.svelte";
    import Close from "$lib/svg/Close.svelte";
    import click from "$lib/audio/click.mp3";
    import Dots from "$lib/svg/dots.svelte";

    function tocarAudio() {
        const audio = new Audio(click);
        audio.play();
    }

    function calculaTempo() {
        functions.stop = true;
        nums = [];
        for (let i = 1; i <= tempoArray[0]; i++) {
            nums.push({ num: i, tempo: 1 });
        }
        functions.start();
    }
    let none = $state(true);
    let style = $state();

    let bpm = $state(100);
    let tempo = $state("4/4");
    let tempoArray = $derived(tempo.split("/"));

    let velocidade = $derived((60 / bpm) * 1000);

    let lastTime = performance.now();

    let counter = $state(0);

    let functions = {};

    let nums = $state([
        { num: 1, tempo: 1, tempoFocus: false },
        { num: 2, tempo: 1, tempoFocus: false },
        { num: 3, tempo: 1, tempoFocus: false },
        { num: 4, tempo: 1, tempoFocus: false },
    ]);

    functions.start = () => {
        counter = nums.length;
        lastTime = performance.now();

        (function tick() {
            if (functions.stop) {
                functions.stop = false;
                style = "";
                if (counter > tempoArray[0]) counter = 1;
                nums[counter - 1].tempoFocus = false;
                return;
            }
            let now = performance.now();
            let delta = now - lastTime;

            if (delta >= velocidade) {
                lastTime += velocidade;
                style = "";
                style = `animation-duration: ${velocidade / 0.5}ms`;
                tocarAudio();
                nums[counter - 1].tempoFocus = false;
                counter++;
                if (counter > tempoArray[0]) counter = 1;
                nums[counter - 1].tempoFocus = true;
            }
            requestAnimationFrame(tick);
        })();
    };

    functions.stop = false;
</script>

<section
    class="w-2xl m-2 flex h-[98.5%] grow-0 flex-col justify-between rounded border border-blue-500/60 bg-zinc-950/90 p-4"
>
    <div class="flex">
        <h3 class="mx-auto text-center text-xl pl-6 text-white">Metrônomo</h3>
        <button onclick={(none = !none)}>
            <Settings />
        </button>
    </div>
    <div class="flex-1/6">
        <h2 class="mt-4 text-center text-4xl font-thin text-white">
            {bpm}Bpm {tempo}
        </h2>

        <div
            class="mx-auto mt-3 flex items-center {nums.length > 4
                ? 'max-w-40'
                : ''} flex-wrap justify-center gap-1.5"
        >
            {#each nums as num}
                <Tempo
                    num={num.num}
                    tempo={num.tempo}
                    tempoFocus={num.tempoFocus}
                />
            {/each}
        </div>
    </div>

    <div>
        <Dots />
        <div
            class="rounded mx-auto mb-10 h-96 w-1 bg-blue-400"
            id="pointer"
            {style}
        ></div>
    </div>

    <div
        class="w-xs mx-auto flex h-20 flex-col items-center justify-center bg-gray-900 text-white shadow shadow-gray-950"
    >
        <div class="flex w-60 text-center">
            <label for="bpm" class="block w-[50%]">BPM</label>
            <label for="compasso" class="block w-[50%]">Compasso</label>
        </div>
        <div class="flex gap-2">
            <input
                type="number"
                bind:value={bpm}
                onchange={() => {
                    if (!bpm) return (bpm = 60);
                    if (typeof bpm === "string") return (bpm = 60);
                    if (bpm < 40) return (bpm = 40);
                    if (bpm >= 400) return (bpm = 400);
                }}
                class="w-[50%] border border-gray-700 text-center"
                min="21"
                pattern="\d*"
            />
            <select
                name="compasso"
                id="compasso"
                bind:value={tempo}
                onchange={calculaTempo}
                class="w-[50%] border border-gray-700 bg-gray-900 text-center"
            >
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
    </div>
    <div>
        <Player {functions} />
    </div>
</section>

<div
    class="fixed inset-0 z-10 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/30 transition-opacity duration-300 {none
        ? 'pointer-events-none opacity-0'
        : 'opacity-100'}"
>
    <div
        class="w-2xl shadow-xs z-10 h-[450px] transform bg-zinc-950 p-1 shadow-blue-950 transition-all duration-300 {none
            ? '-translate-y-20 opacity-0'
            : 'translate-y-0 opacity-100'}"
    >
        <div class="flex items-center">
            <h2
                class="mx-auto text-center font-bold capitalize text-white hover:text-blue-500"
            >
                Metrônomo
            </h2>
            <button
                onclick={() => (none = !none)}
                class="-ml-8 inline h-8 w-8 text-right hover:bg-red-600"
            >
                <Close />
            </button>
        </div>
    </div>
</div>

<style>
    #pointer {
        transform-origin: 50% 100%;
        animation: pointer infinite linear;
    }

    @keyframes pointer {
        0% {
            rotate: z 37deg;
        }
        50% {
            rotate: z -37deg;
        }
        100% {
            rotate: z 37deg;
        }
    }
</style>
