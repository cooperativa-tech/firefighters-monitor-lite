import { parseLanguageHeader } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	return parseLanguageHeader(request);
};
