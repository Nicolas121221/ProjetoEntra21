<script>
	import Nav from '$lib/components/Nav.svelte';

    let changed = $state()
</script>

<Nav />

<aside
	class="fixed bottom-0 left-0 top-0 z-20 mt-10 w-56 border-r border-white/20 bg-zinc-950/95 capitalize text-white"
>
	<h1 class="border-b border-white/20 py-5 text-center text-2xl">Configurações</h1>
	<section class="flex flex-col items-center">
		<a
			href="/config/"
			class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 text-center hover:border-white hover:bg-gray-800 active:bg-blue-950"
			>Geral</a
		>
		<a
			href="/config/acessiblidade"
			class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 text-center hover:border-white hover:bg-gray-800 active:bg-blue-950"
			>Acessibilidade</a
		>
		<a
			href="/config/interface"
			class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 text-center hover:border-white hover:bg-gray-800 active:bg-blue-950"
			>Interface</a
		>
		<a
			href="/config/conta"
			class="duration-50 m-1 w-[95%] rounded-full border border-white/0 px-5 py-3 text-center hover:border-white hover:bg-gray-800 active:bg-blue-950"
			>Conta</a
		>
	</section>
</aside>
<main class="absolute left-0 right-0 mt-10 bg-gray-900 pl-56">
	<section
		class="text-shadow-sm text-shadow-black m-10 my-20 w-fit rounded-xl border border-white/50 bg-gray-600 p-5 text-white shadow shadow-black"
	>
		<h2 class="text-5xl font-semibold">Geral</h2>
		<p class="w-2xl mt-3 inline-block">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus autem, obcaecati possimus
			molestiae nihil pariatur nostrum inventore sed perferendis qui voluptas quis architecto
			expedita? Enim odit nostrum esse facilis rerum?
		</p>
	</section>

	<section class="m-10 my-20 h-screen text-white">
		<h3 class="text-2xl font-semibold">Temas</h3>
		<p class="w-xl mt-3 inline-block">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus autem, obcaecati possimus
			molestiae nihil pariatur nostrum inventore sed perferendis qui voluptas quis architecto
			expedita? Enim odit nostrum esse facilis rerum?
		</p>
		<h3 class="mt-5 text-2xl font-semibold">Alto Contraste</h3>
		<p class="w-xl mt-3 inline-block">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus autem, obcaecati possimus
			molestiae nihil pariatur nostrum inventore sed perferendis qui voluptas quis architecto
			expedita? Enim odit nostrum esse facilis rerum?
		</p>
	</section>

  
</main>

{#if changed}
<button
class="text-shadow-green-800 fixed bottom-5 right-5 z-40 flex cursor-pointer items-center justify-center rounded-full border-2 border-green-400/40 bg-green-600/20 px-5 py-1 font-bold text-green-500 duration-150 hover:bg-green-400/50 hover:text-white active:bg-green-300 active:text-green-800"
>
+ Salvar alterações
</button>  
{/if}

