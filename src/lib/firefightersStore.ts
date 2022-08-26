import { subscribeToQuery } from 'datocms-listen';
import { writable } from 'svelte/store';

import {
	firefightersQuery,
	type FIREFIGHTER_AVAILABILITY_TYPE,
	type FIREFIGHTER_DUTY_TYPE,
	type FIREFIGHTER_TYPE
} from './firefightersQuery';

interface StoreType {
	firefighters?: FIREFIGHTER_TYPE[];
	loading: boolean;
}

function createFirefighters() {
	const { subscribe, set, update } = writable<StoreType>({
		firefighters: undefined,
		loading: false
	});

	if (typeof window !== 'undefined') {
		subscribeToQuery({
			query: firefightersQuery.toString(),
			token: import.meta.env.VITE_DATO_READ_TOKEN,
			includeDrafts: false,
			onUpdate: ({ response }) => {
				update((store) => ({ ...store, firefighters: response.data.firefighters }));
			},
			onStatusChange: (status) => {
				console.log(status);
			},
			onChannelError: (error) => {
				console.error(error);
			}
		});
	}

	function updateFirefighter(
		firefighterId: string,
		updateParams: Partial<Omit<FIREFIGHTER_TYPE, 'id'>>
	) {
		update((store) => ({
			...store,
			firefighters: store.firefighters?.map((firefighter) => {
				if (firefighter.id === firefighterId) {
					return { ...firefighter, ...updateParams } as FIREFIGHTER_TYPE;
				}

				return firefighter;
			})
		}));
	}

	function setLoading(value: boolean) {
		update((store) => ({ ...store, loading: value }));
	}

	async function updateAvailability(firefighter: FIREFIGHTER_TYPE) {
		let nextAvailability: FIREFIGHTER_AVAILABILITY_TYPE = 'unavailable';

		if (firefighter.availability === 'unavailable') nextAvailability = 'available';
		if (firefighter.availability === 'available') nextAvailability = 'service';
		if (firefighter.availability === 'service') nextAvailability = 'unavailable';

		const updateParams = { availability: nextAvailability };

		setLoading(true);
		try {
			await fetch(`/api/firefighter/${firefighter.id}`, {
				method: 'PATCH',
				body: JSON.stringify(updateParams)
			});
		} finally {
			updateFirefighter(firefighter.id, updateParams);
			setLoading(false);
		}
	}

	async function updateDutyType(firefighter: FIREFIGHTER_TYPE) {
		let nextDutyType: FIREFIGHTER_DUTY_TYPE | null = 'picket';

		if (firefighter.dutyType === 'picket') nextDutyType = 'elac';
		if (firefighter.dutyType === 'elac') nextDutyType = 'eip';
		if (firefighter.dutyType === 'eip') nextDutyType = null;

		const updateParams = { dutyType: nextDutyType as FIREFIGHTER_DUTY_TYPE };

		setLoading(true);
		try {
			await fetch(`/api/firefighter/${firefighter.id}`, {
				method: 'PATCH',
				body: JSON.stringify(updateParams)
			});
		} finally {
			updateFirefighter(firefighter.id, updateParams);
			setLoading(false);
		}
	}

	return {
		subscribe,
		updateAvailability,
		updateDutyType
	};
}

const firefightersStore = createFirefighters();

export default firefightersStore;
