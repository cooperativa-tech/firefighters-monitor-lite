<script lang="ts">
	import type { PageServerData } from './$types';
	import firefightersStore from '$lib/firefightersStore';
	import PresenceButton from '$lib/components/PresenceButton.svelte';
	import PresencesList from '$lib/components/PresencesList.svelte';

	export let data: PageServerData;

	// Start the firefighters with data from the server then load in the data
	// from the real time store
	let firefighters = data.firefighters;
	$: firefighters = $firefightersStore.firefighters || data.firefighters;
</script>

<main>
	<div class="buttons">
		{#each firefighters as firefighter}
			<PresenceButton {firefighter} />
		{/each}
	</div>

	<div class="lists">
		<PresencesList config={{ kind: 'availability', firefighters, value: 'available' }} />

		<PresencesList config={{ kind: 'availability', firefighters, value: 'service' }} />

		<PresencesList config={{ kind: 'dutyType', firefighters, value: 'picket' }} />

		<PresencesList config={{ kind: 'dutyType', firefighters, value: 'elac' }} />

		<PresencesList config={{ kind: 'dutyType', firefighters, value: 'eip' }} />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		height: 100%;

		font-family: 'Space Mono', monospace;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		width: 77%;
	}

	.lists {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 30%;
		height: 100%;
		padding: 1rem;

		font-size: 28px;
		line-height: 40px;
	}
</style>
