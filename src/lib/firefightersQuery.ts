import { alias, query, types } from 'typed-graphqlify';

export const firefighterAvailabilities = ['available', 'unavailable', 'service', 'onCall'] as const;
export const firefighterDutyTypes = ['picket', 'ecin', 'eip'] as const;
export const firefighterCategory = [
	'third',
	'second',
	'first',
	'subChief',
	'chief',
	'adjunct',
	'secondCommander',
	'commander'
] as const;
export const firefighterFragment = {
	id: types.string,
	name: types.string,
	availability: types.oneOf(firefighterAvailabilities),
	dutyType: types.oneOf(firefighterDutyTypes),
	category: types.oneOf(firefighterCategory)
};

export type FIREFIGHTER_TYPE = typeof firefighterFragment;
export type FIREFIGHTER_AVAILABILITY_TYPE = typeof firefighterAvailabilities[number];
export type FIREFIGHTER_DUTY_TYPE = typeof firefighterDutyTypes[number];
export type FIREFIGHTER_CATEGORY_TYPE = typeof firefighterCategory[number];

export const firefightersQuery = query('allFirefighters', {
	[alias('firefighters', 'allFirefighters(orderBy: sortingIndex_ASC, first: 100)')]: [
		firefighterFragment
	]
});
