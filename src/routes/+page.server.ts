import { DATO_FULL_ACCESS_TOKEN } from '$env/static/private';
import { firefightersQuery } from '$lib/firefightersQuery';

import type { PageServerLoad } from './$types';

async function fetchFirefighters() {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${DATO_FULL_ACCESS_TOKEN}`
		},
		body: JSON.stringify({
			query: firefightersQuery.toString()
		})
	});
	const json: typeof firefightersQuery = await response.json();

	return json.data.firefighters;
}

export const load: PageServerLoad = async () => {
	const firefighters = await fetchFirefighters();

	return {
		firefighters
	};
};
