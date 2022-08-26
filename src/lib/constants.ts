import type { FIREFIGHTER_AVAILABILITY_TYPE, FIREFIGHTER_DUTY_TYPE } from './firefightersQuery';

export const LABELS: Record<
	FIREFIGHTER_AVAILABILITY_TYPE | FIREFIGHTER_DUTY_TYPE,
	string
> = {
	available: 'Available',
	service: 'Service',
	unavailable: 'Unavailable',
	picket: 'Picket',
	eip: 'EIP',
	elac: 'ELAC'
};
