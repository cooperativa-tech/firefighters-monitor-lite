import { handleClientError } from '$lib/errors';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error }) => {
	const castedError = error as Error;

	handleClientError(castedError.message, castedError);
};
