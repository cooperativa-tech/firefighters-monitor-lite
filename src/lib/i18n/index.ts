import acceptLanguageParser from 'accept-language-parser';
import get from 'lodash/get';
import en from './en';
import pt from './pt';

export default function t(...key: string[]) {
	const localeObject = globalThis.locale === 'pt' ? pt : en;
	const parsedKey = key.join('.');
	const translation = get(localeObject, parsedKey);

	if (translation) return translation;

	console.warn(`Missing i18n label: ${parsedKey} for locale ${globalThis.locale}`);

	return key;
}
export function parseLanguageHeader(request: Request) {
	const locales = acceptLanguageParser.parse(request.headers.get('accept-language') || 'en-us');

	if (!locales[0]) return { locale: 'en-us' };

	return { locale: locales[0].code };
}
