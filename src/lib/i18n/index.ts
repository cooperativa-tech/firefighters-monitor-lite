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
