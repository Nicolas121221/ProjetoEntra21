<script>
	let { num, tempo } = $props();

	let tempoNow = [tempo]

	let tempoClass = $state('tempo');
	function getClass() {
		if (tempoNow=== 1) return (tempoClass = 'tempo');
		if (tempoNow=== 2) return (tempoClass = 'tempo-high');
		if (tempoNow=== 3) return (tempoClass = 'tempo-hidden');
		if (tempoNow=== 4) return (tempoClass = 'tempo-focus');
	}
	getClass();
</script>

<button
	onclick={() => {
		tempoNow++;
		if (tempoNow > 3) tempoNow = 1;
		getClass();
	}}
>
	<div class="duration-50 cursor-pointer text-center active:scale-95 {tempoClass}">
		{num}
	</div>
</button>
