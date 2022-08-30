<script>
	import { page } from '$app/stores';
	import { handleError } from '$lib/errors';
	import { onMount } from 'svelte';

	onMount(() => {
		handleError($page.error);
	});
</script>

<h1>Error</h1>
