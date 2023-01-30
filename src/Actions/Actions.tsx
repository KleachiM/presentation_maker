import {Point, Slide, StateTypes} from '../Models/types';

export function setActiveSlide(activeSlide: string) {
	return {
		type: StateTypes.SET_ACTIVE_SLIDE,
		payload: activeSlide
	};
}

export function setElemChecked(elemId: Array<string>) {
	return {
		type: StateTypes.SET_ELEM_CHECKED,
		payload: elemId
	};
}

export function setElemPosition(slide: Slide, elemId: string | undefined, newPos: Point) {
	return {
		type: StateTypes.SET_ELEM_NEW_POS,
		payload: {
			slide: slide,
			elemId: elemId,
			newPos: newPos
		}
	};
}

export function setElemSize(slide: Slide, elemId: string | undefined, newWidth: number, newHeight: number) {
	return {
		type: StateTypes.SET_ELEM_NEW_SIZE,
		payload: {
			slide: slide,
			elemId: elemId,
			newWidth: newWidth,
			newHeight: newHeight
		}
	};
}

export function changePresentationTitle(newTitle: string) {
	console.log(`in action newTitle: ${newTitle}`);
	return {
		type: StateTypes.CHANGE_TITLE,
		payload: newTitle
	};
}