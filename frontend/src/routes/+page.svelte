<script>
    import Nav from "$lib/components/Nav.svelte";
    import Background from "$lib/components/Background.svelte";
    import Metronome from "$lib/components/Metronome.svelte";
    import Playlist from "$lib/components/Playlist.svelte";
</script>

<Nav />
<Background />

<main class="max-w-screen flex h-screen max-h-screen w-screen pt-10">
    <Playlist />
    <Metronome />
</main>
