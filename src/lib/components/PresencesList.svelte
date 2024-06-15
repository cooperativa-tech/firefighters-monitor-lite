<script lang="ts">
	import type {
		FIREFIGHTER_AVAILABILITY_TYPE,
		FIREFIGHTER_DUTY_TYPE,
		FIREFIGHTER_TYPE
	} from '$lib/firefightersQuery';
	import t from '$lib/i18n';

	type CONFIG_TYPE =
		| {
				kind: 'availability';
				value: FIREFIGHTER_AVAILABILITY_TYPE;
				firefighters: FIREFIGHTER_TYPE[];
		  }
		| { kind: 'dutyType'; value: FIREFIGHTER_DUTY_TYPE; firefighters: FIREFIGHTER_TYPE[] };

	const VALUE_TO_COLOR: Record<FIREFIGHTER_AVAILABILITY_TYPE | FIREFIGHTER_DUTY_TYPE, string> = {
		available: 'var(--color-leaf-green)',
		service: 'var(--color-fire-red)',
		onCall: 'var(--color-blue)',
		picket: 'var(--color-yellow)',
		ecin: 'var(--color-roasted-yellow)',
		eip: 'var(--color-purple)',
		unavailable: ''
	};

	export let config: CONFIG_TYPE;
</script>

<div>
	<h3 class="value" style="border-color: {VALUE_TO_COLOR[config.value]};">
		{t(config.kind, config.value)}
	</h3>

	<div class="list">
		{#each config.firefighters.filter((firefighter) => firefighter[config.kind] === config.value) as firefighter}
			<span>{firefighter.name}</span>
		{/each}
	</div>
</div>

<style>
	.value {
		border-bottom: 4px solid;
		margin: 0 0 1rem;
	}

	.list {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
