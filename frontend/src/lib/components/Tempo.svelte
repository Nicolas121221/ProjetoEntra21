<script>
	let { num, tempo, count } = $props();

	let tempoClass = $state('tempo');

	function getClass() {
		if (tempo === 1) return (tempoClass = 'tempo');
		if (tempo === 2) return (tempoClass = 'tempo-high');
		if (tempo === 3) return (tempoClass = 'tempo-hidden');
	}
	getClass();
</script>

<button
	onclick={() => {
		tempo++;
		if (tempo >= 4) tempo = 1;
		getClass();
	}}
>
	<div
		class="duration-50 cursor-pointer text-center active:scale-95 {count === num
			? "tempo-focus"
			: tempoClass}"
	>
		{num}
	</div>
</button>
