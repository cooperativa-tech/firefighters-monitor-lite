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

	<div class="lists-container">
		<div class="lists">
			<PresencesList config={{ kind: 'availability', firefighters, value: 'onCall' }} />

			<PresencesList config={{ kind: 'availability', firefighters, value: 'available' }} />

			<PresencesList config={{ kind: 'availability', firefighters, value: 'service' }} />
		</div>
		<div class="lists">
			<PresencesList config={{ kind: 'dutyType', firefighters, value: 'picket' }} />

			<PresencesList config={{ kind: 'dutyType', firefighters, value: 'ecin' }} />

			<PresencesList config={{ kind: 'dutyType', firefighters, value: 'eip' }} />
		</div>
	</div>
</main>

<style>
	main {
		margin: 0;
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		min-height: 100vh;
		background: linear-gradient(135deg, #0c0d10, #2e3b4e, #1f1f1f);
		background-size: 400% 400%;
		color: white;

		font-family: 'Space Mono', monospace;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		width: 70%;
	}

	.lists-container {
		display: flex;
		flex-grow: 1;
		width: 30%;
		flex-direction: column;
		justify-content: space-between;
		min-height: 90vh;
	}

	.lists {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		height: 100%;
		padding: 1rem;
		font-size: 28px;
		line-height: 40px;
	}
</style>
