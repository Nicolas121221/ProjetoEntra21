<script>
    import Nav from "$lib/components/Nav.svelte";
    import Background from "$lib/components/Background.svelte";

    let changed = $state();
</script>

<Background />
<Nav />

<aside
    class="fixed bottom-0 left-0 top-0 z-20 mt-10 w-56 border-r border-blue-500/60 bg-zinc-950/95 capitalize text-white"
>
    <h1 class="border-y border-blue-500/60 py-5 indent-7 text-2xl">Menu</h1>
    <section class="flex flex-col items-center">
        <a
            href="/config/"
            class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 hover:border-blue-500/60 hover:bg-blue-600 active:bg-blue-950"
            >Geral</a
        >
        <a
            href="/config/acessiblidade"
            class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 hover:border-blue-500/60 hover:bg-blue-600 active:bg-blue-950"
            >Acessibilidade</a
        >
        <a
            href="/config/interface"
            class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 hover:border-blue-500/60 hover:bg-blue-600 active:bg-blue-950"
            >Interface</a
        >
        <a
            href="/config/conta"
            class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 hover:border-blue-500/60 hover:bg-blue-600 active:bg-blue-950"
            >Conta</a
        >
    </section>
</aside>
<main class="absolute left-0 right-0 mt-1 pl-56">
    <section
        class="mt-10 flex h-40 w-full flex-col justify-center border-b border-b-black p-5 text-white"
    >
        <h2 class="text-5xl font-semibold">Configurações</h2>

        <div
            class="mt-5 *:w-24 *:rounded-full *:border *:border-white/40 *:bg-zinc-900 *:px-4 *:py-1 *:duration-75 *:hover:bg-blue-600"
        >
            <a href="/geral">Geral</a>
            <a href="/geral">Acessibilidade</a>
            <a href="/geral">Interface</a>
            <a href="/geral">Conta</a>
        </div>
    </section>
    <section class="m-10 h-screen text-white">
        <h3 class="text-2xl font-semibold">Temas</h3>
        <h3 class="mt-5 text-2xl font-semibold">Alto Contraste</h3>
    </section>
</main>

{#if changed}
    <button
        class="text-shadow-green-800 fixed bottom-5 right-5 z-40 flex cursor-pointer items-center justify-center rounded-full border-2 border-green-400/40 bg-green-600/20 px-5 py-1 font-bold text-green-500 duration-150 hover:bg-green-400/50 hover:text-white active:bg-green-300 active:text-green-800"
    >
        + Salvar alterações
    </button>
{/if}
