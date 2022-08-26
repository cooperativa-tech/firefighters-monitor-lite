<script lang="ts">
	import type { FIREFIGHTER_TYPE } from '$lib/firefightersQuery';
	import firefightersStore from '$lib/firefightersStore';
	import { LABELS } from '$lib/constants';

	export let firefighter: FIREFIGHTER_TYPE;
</script>

<button
	class="button"
	class:button-available={firefighter.availability === 'available'}
	class:button-service={firefighter.availability === 'service'}
	on:click={(event) => {
		if ($firefightersStore.loading) return;

		event.preventDefault();
		firefightersStore.updateAvailability(firefighter);
	}}
	on:contextmenu={(event) => {
		if ($firefightersStore.loading) return;

		event.preventDefault();
		firefightersStore.updateDutyType(firefighter);
	}}
	disabled={$firefightersStore.loading}
>
	<span class="block name">{firefighter.name}</span>

	{#if firefighter.dutyType}
		<div
			class="dutytype"
			class:dutytype--picket={firefighter.dutyType === 'picket'}
			class:dutytype--elac={firefighter.dutyType === 'elac'}
			class:dutytype--eip={firefighter.dutyType === 'eip'}
		>
			{LABELS[firefighter.dutyType]}
		</div>
	{/if}

	<div class="block status">
		{firefighter.availability === 'unavailable' ? '' : LABELS[firefighter.availability]}
	</div>
</button>

<style>
	.button {
		position: relative;

		width: 120px;
		height: 102px;
		padding: 4px;
		margin: 10px;

		background-color: var(--color-grey);
		border: 1px solid var(--color-grey);
		border-radius: 4px;

		cursor: pointer;
		outline: none;

		font-family: var(--font-family-sans-serif);

		font-size: 28px;
		font-weight: var(--font-weight-bold);
		line-height: 46px;
		text-decoration: none;
		word-wrap: break-word;

		transition: transform 0.3s ease-in-out;
		user-select: none;
	}

	.button:hover {
		transform: translateY(-6px);
	}

	.button:disabled {
		opacity: 0.65;
		cursor: progress;
	}

	.block {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 50%;
	}

	.name {
		padding-bottom: 8px;
	}

	.button-available {
		background-color: var(--color-leaf-green);
		border-color: var(--color-leaf-green);
	}

	.button-service {
		background-color: var(--color-fire-red);
		border-color: var(--color-fire-red);
	}

	.dutytype {
		position: absolute;
		top: 40%;
		left: 10%;
		z-index: 1;

		width: 80%;
		height: auto;

		background-color: var(--color-yellow);
		border-radius: 12px;
		color: var(--color-black);
		font-size: 16px;
		font-weight: var(--font-weight-regular);
		line-height: 20px;
	}

	.dutytype--elac {
		background-color: var(--color-roasted-yellow);
	}

	.dutytype--eip {
		background-color: var(--color-purple);
	}

	.status {
		background-color: var(--color-black);
		border-radius: 4px;
		color: white;

		font-family: var(--font-family-mono);

		font-size: 16px;
		font-weight: var(--font-weight-regular);

		line-height: 20px;
	}
</style>
