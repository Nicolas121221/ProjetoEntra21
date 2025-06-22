<script>
	let { title, href } = $props();
</script>

<a {href}
	class="mx-auto flex h-16 w-[90%] cursor-pointer items-center justify-center rounded-full border-2 border-solid border-blue-950 text-center text-xl text-white duration-150 hover:bg-blue-900 active:scale-100 active:bg-blue-800"
>
	{title}
</a>
