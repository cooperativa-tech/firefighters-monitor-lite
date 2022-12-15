import { alias, query, types } from 'typed-graphqlify';

export const firefighterAvailabilities = ['available', 'unavailable', 'service'] as const;
export const firefigterDutyTypes = ['picket', 'elac', 'eip'] as const;
export const firefighterFragment = {
	id: types.string,
	name: types.string,
	availability: types.oneOf(firefighterAvailabilities),
	dutyType: types.oneOf(firefigterDutyTypes)
};

export type FIREFIGHTER_TYPE = typeof firefighterFragment;
export type FIREFIGHTER_AVAILABILITY_TYPE = typeof firefighterAvailabilities[number];
export type FIREFIGHTER_DUTY_TYPE = typeof firefigterDutyTypes[number];

export const firefightersQuery = query('allFirefighters', {
	[alias('firefighters', 'allFirefighters(orderBy: sortingIndex_ASC, first: 100)')]: [firefighterFragment]
});
