<script>
    import { page } from "$app/state";
    import Background from "$lib/components/Background.svelte";
    import Nav from "$lib/components/Nav.svelte";

    let status = $state(page.status);
</script>

<Nav />
<Background />
<main
    class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center"
>
    <section class="text-xl text-white shadow-md bg-zinc-950 p-4 rounded-md">
        <h2 class="text-2xl mb-2">Erro: {status}</h2>
        {#if status === 404}
            <p
                class="rounded border border-red-500 bg-red-500/20 px-2 py-1 text-red-500"
            >
                Esta página não existe.
            </p>
        {:else if status === 500}
            <p
                class="rounded border border-red-500 bg-red-500/20 px-2 py-1 text-red-500 max-w-lg"
            >
                Houve um problema no servidor, recarregue a página ou volte para
                a home.
            </p>
        {:else}
            <p
                class="rounded border border-red-500 bg-red-500/20 px-2 py-1 text-red-500 max-w-lg"
            >
                Estamos com problemas técnicos, recarregue a página ou volte
                para home.
            </p>
        {/if}
        Ir para a
        <a
            class="text-blue-400 underline-offset-2 underline mt-1 inline-block"
            href="/">Home</a
        ><br />
        Fazer o
        <a class="text-blue-400 underline-offset-2 underline mt-3" href="/login"
            >Login</a
        >
    </section>
</main>
