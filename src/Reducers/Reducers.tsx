import {getTestData} from '../Models/data';
import {Presentation, StateTypes} from '../Models/types';

export function mainReducer(state = getTestData(), action: any): Presentation {
	switch (action.type) {
	case StateTypes.SET_ACTIVE_SLIDE:
		return {
			...state,
			active_slide: action.payload
		};
	case StateTypes.SET_ELEM_CHECKED:
		return state;
	}
	return state;
}