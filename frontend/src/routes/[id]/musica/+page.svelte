<script>
	import { page } from '$app/state';
	import Background from '$lib/components/Background.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { onMount } from 'svelte';

	let data = $state();
	let chords = $state('');
	let url = $state('');
	onMount(async () => {
		try {
			const res = await fetch(`http://localhost:3000/spotify/song/${page.params.id}`);
			if (res) data = await res.json();
			const cifra = await fetch(`http://localhost:3000/cifra/${data.artists[0].name}/${data.name}`);
			if (!cifra) {
				return (chords = [{ title: '', content: 'Nenhuma cifra encontrada' }]);
			} else {
				return (chords = await cifra.json());
			}
		} catch (e) {
			alert(e);
		}
	});
</script>

<Nav />
<Background />

{#if data}
	<main class="mx-auto h-screen max-w-6xl pt-12 text-white">
		<section class="mt-10 rounded-xl border border-white/20 bg-gray-950/50 px-60 py-20">
			<img
				src={data.album.images[0].url}
				alt="imagem do album pesquisado"
				class="size-64 rounded shadow shadow-white/50"
			/>
			<h1 class="text-3xl font-bold">
				{data.name} <span class="text-center text-xl font-light opacity-50">{data.album.name}</span>
			</h1>
			<h4 class="text-lg">{data.artists[0].name} - {data.album.release_date}</h4>
			<a href="{data.href}">
                <img
                    src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-logo-spotify-symbol-3.png"
                    alt="logo do spotify"
                    class="w-7 mt-5 duration-150 hover:scale-105 aspect-auto cursor-pointer"
                />
            </a>
		</section>
		<section class="mt-10 h-fit rounded-xl border border-white/20 bg-gray-950/50 p-10">
			<h5 class="pr-20 pt-5 text-right text-2xl font-semibold capitalize text-white">
				Cifra<a href="https://www.cifraclub.com.br/"
					><img
						src="https://lh3.googleusercontent.com/2pAYbfice3PNJcQErwmjSfuCIvM4cVr3fL4QZzGWb9voP3yrqiXv-JSf0ntakIuB9dM=w300"
						alt="Logo do cifraclub"
						class="ml-5 inline-block size-8 duration-150 hover:scale-105"
					/></a
				>
			</h5>
			<pre class="flex flex-col">
                {#each chords as chord}
					<article class="">
					<h6 class="text-lg font-bold">{@html chord.title}</h6>
					<pre>{@html chord.content}</pre>
				</article>
				{/each}
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
