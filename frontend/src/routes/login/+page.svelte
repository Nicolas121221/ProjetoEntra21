<script>
	import Background from '$lib/components/Background.svelte';
	let src = [
		'https://www.festivalpro.com/articles/1568.png',
		'https://guitarglissando.com/wp-content/uploads/2022/11/elecback-e1667796666445.jpg',
		'https://studiosol-a.akamaihd.net/tb/letras-blog/wp-content/uploads/2019/04/5a78f4c-shows_internacionais.jpg',
		'https://tse4.mm.bing.net/th/id/OIP.9p6SQjpCbKT0REfObS1WQwHaEo?cb=iwc2&w=1600&h=1000&rs=1&pid=ImgDetMain'
	];
	let num = 0;
	setInterval(() => {
		if (num === src.length - 1) {
			return (num = 0);
		}
		num++;
	}, 10000);

	async function enviaForm() {}
</script>

<svelte:head>
	<link rel="preload" href={src[num]} />
</svelte:head>

<Background />

<main class="flex h-screen w-screen items-center justify-center">
	<section
		class="w-4xl mx-4 flex h-[600px] max-h-screen bg-zinc-900"
	>
		<section
			class="flex-2/6 block h-full bg-cover bg-center border-r border-r-white/20"
			style="background-image: url({src[num]});"
		>
			<div
				class="relative bottom-0 left-0 right-0 top-0 h-full w-full bg-gray-950/20 transition-colors duration-200 hover:bg-gray-950/10"
			>
				<h2
					class="text-shadow-lg pt-10 text-center font-sans text-2xl font-semibold text-white hover:underline"
				>
					Login
				</h2>
			</div>
		</section>
		<div
			class="flex-2/4 z-10 flex h-full flex-col items-center justify-center gap-4 bg-neutral-950/80 text-white"
		>
			<p class="text-center text-lg capitalize">Entrar com uma conta</p>
			<form action={enviaForm} class="flex gap-4 justify-center items-center flex-col w-full">
				<label for="senha" class="-mb-4 w-[60%]">Email:</label>
				<input
					type="email"
					name="usuario"
					id="usuario"
					placeholder="usuario@email.com"
					class="w-[60%] border border-white/30 border-b-white bg-gray-900/20 px-4 py-1 outline-none focus:bg-blue-950"
				/>

				<label for="senha" class="-mb-4 w-[60%]">Senha:</label>
				<input
					type="password"
					name="senha"
					id="senha"
					placeholder="sua senha"
					class=": w-[60%] border border-b border-white/30 border-b-white bg-gray-900/20 px-4 py-1 outline-none focus:bg-blue-950"
				/>
			</form>

			<hr class="w-[80%] bg-white opacity-20" />
			<button
				class="w-[60%] cursor-pointer border border-green-400 py-1 font-bold text-green-400 duration-75 hover:bg-green-500/20"
			>
				Login
			</button>
			<button
				class="w-[60%] cursor-pointer border border-blue-400 py-1 font-bold text-blue-400 duration-75 hover:bg-blue-500/20"
			>
				Cadastrar-se
			</button>

			<div class="mt-1 flex gap-3">
				<a href="/Login"
					><img
						class="size-5 select-none duration-200 hover:scale-125"
						src="https://cdn-icons-png.flaticon.com/512/3669/3669986.png"
						alt="spotify logo"
					/></a
				>
				<a href="/Login"
					><img
						class="size-5 select-none duration-200 hover:scale-125"
						src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
						alt="google logo"
					/></a
				>
				<a href="/Login"
					><img
						class="size-5 select-none duration-200 hover:scale-125"
						src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png "
						alt="facebook logo"
					/></a
				>
			</div>
			<p class="text-sm">
				não lembra a senha? <a
					href="/login"
					class="text-shadow-lg text-shadow-white/10 text-blue-600 hover:underline"
					>Redefinir senha</a
				>
			</p>
		</div>
	</section>
</main>
