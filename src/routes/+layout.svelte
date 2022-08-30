<script lang="ts">
	import { onMount } from 'svelte';
	import IdleTracker from 'idle-tracker';
	import type { LayoutServerData } from './$types';
	import { handleError } from '$lib/errors';

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

		window.onerror = function (_message, _source, _lineno, _colno, error) {
			handleError(error as Error);
		};
	});
</script>

<slot />
