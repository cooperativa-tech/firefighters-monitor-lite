import { json } from '@sveltejs/kit';
import { DATO_FULL_ACCESS_TOKEN } from '$env/static/private';

import type { RequestEvent } from './$types';

const API_URL = 'https://site-api.datocms.com';
const HEADERS = new Headers({
	Authorization: `Bearer: ${DATO_FULL_ACCESS_TOKEN}`,
	Accept: 'application/json',
	'Content-Type': 'application/vnd.api+json',
	'X-Api-Version': '3'
});

export async function PATCH({ params, request }: RequestEvent) {
	const body = await request.json();

	const response = await fetch(`${API_URL}/items/${params.id}`, {
		method: 'PUT',
		headers: HEADERS,
		body: JSON.stringify({
			data: {
				type: 'item',
				id: params.id,
				attributes: {
					availability: body.availability,
					duty_type: body.dutyType
				}
			}
		})
	});
	const jsonresponse = await response.json();

	if (jsonresponse?.data?.id !== params.id) return json({ message: 'error' });

	return json({
		message: 'ok'
	});
}
