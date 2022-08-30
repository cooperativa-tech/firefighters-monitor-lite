import type { Handle, HandleError } from '@sveltejs/kit';
import { ADMIN_LOGIN } from '$env/static/private';
import { handleServerError } from '$lib/errors';

export const handle: Handle = async ({ event, resolve }) => {
	const auth = event.request.headers.get('Authorization');

	if (auth !== `Basic ${btoa(ADMIN_LOGIN)}`) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
			}
		});
	}

	return resolve(event);
};

export const handleError: HandleError = async ({ error, event }) => {
	await handleServerError(error, event);
};
