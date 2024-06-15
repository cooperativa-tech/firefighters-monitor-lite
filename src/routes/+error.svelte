<script>
	import { page } from '$app/stores';
	import { handleClientError } from '$lib/errors';
	import { onMount } from 'svelte';

	onMount(() => {
		handleClientError($page.error?.message || 'Unknown error', $page.error);
	});
</script>

<h1>Error</h1>
