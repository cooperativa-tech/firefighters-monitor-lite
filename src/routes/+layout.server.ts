import acceptLanguageParser from 'accept-language-parser';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const locales = acceptLanguageParser.parse(request.headers.get('accept-language') || 'en-us');

	if (!locales[0]) return { locale: 'en-us' };

	return { locale: locales[0].code };
};
