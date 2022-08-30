import { env } from '$env/dynamic/private';
import { DISCORD_WEBHOOK } from '$env/static/private';

import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	const body = await request.json();

	return fetch(DISCORD_WEBHOOK, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ ...body, username: `Error from ${env.VERCEL_URL}` })
	});
}
