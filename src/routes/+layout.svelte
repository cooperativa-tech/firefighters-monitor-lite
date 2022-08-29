<script>
	import { onMount } from 'svelte';
	import IdleTracker from 'idle-tracker';

	import '../reset.css';

	onMount(() => {
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
