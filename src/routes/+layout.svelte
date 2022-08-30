<script lang="ts">
	import { onMount } from 'svelte';
	import IdleTracker from 'idle-tracker';
	import type { LayoutServerData } from './$types';

	import '../reset.css';

	export let data: LayoutServerData;

	$: {
		globalThis.locale = data.locale;
	}

	onMount(() => {
		// Refresh the page every 5 minutes
		const idleTracker = new IdleTracker({
			// 5 minutes
			timeout: 300000,
			onIdleCallback: () => {
				location.reload();
			}
		});

		idleTracker.start();
	});
</script>

<slot />
