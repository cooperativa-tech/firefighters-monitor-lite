import { json } from '@sveltejs/kit';
import { buildClient } from '@datocms/cma-client-browser';
import { DATO_FULL_ACCESS_TOKEN } from '$env/static/private';

import type { RequestEvent } from './$types';

const client = buildClient({ apiToken: DATO_FULL_ACCESS_TOKEN });

export async function PATCH({ params, request }: RequestEvent) {
	const body = await request.json();

	await client.items.update(params.id, {
		availability: body.availability,
		duty_type: body.dutyType
	});

	return json({
		message: 'ok'
	});
}
