import {StateTypes} from '../Models/types';

export function setActiveSlide(activeSlide: string) {
	return {
		type: StateTypes.SET_ACTIVE_SLIDE,
		payload: activeSlide
	};
}

export function setElemChecked(elemId: string) {
	console.log(`elem with id: ${elemId} checked`);
	return {
		type: StateTypes.SET_ELEM_CHECKED,
		payload: elemId
	};
}
