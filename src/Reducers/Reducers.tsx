import {getTestData} from '../Models/data';
import {Presentation, StateTypes} from '../Models/types';
import {updElemPosition, updElemSize} from '../Models/modelFunctions';

export function mainReducer(state = getTestData(), action: any): Presentation {
	switch (action.type) {
	case StateTypes.SET_ACTIVE_SLIDE: {
		return {
			...state,
			active_slide: action.payload,
			selected_elements: []
		};
	}
	case StateTypes.SET_ELEM_CHECKED: {
		// if (!state.selected_elements.includes(action.payload)) {
		// 	state.selected_elements.push(action.payload);
		// }
		return {
			...state,
			selected_elements: action.payload
		};
	}
	case StateTypes.SET_ELEM_NEW_POS: {
		const newSlide = updElemPosition(
			action.payload.slide,
			action.payload.elemId,
			action.payload.newPos
		);
		const slides = [...state.data];
		const changedSlideIndex = slides.map(e => e.id).indexOf(newSlide.id);
		slides[changedSlideIndex] = newSlide;
		return {
			...state,
			data: slides
		};
	}
	case StateTypes.SET_ELEM_NEW_SIZE: {
		updElemSize(
			action.payload.slide, action.payload.elemId,
			action.payload.newWidth, action.payload.newHeight
		);
		return state;
	}

	case StateTypes.CHANGE_TITLE: {
		console.log(`int reducer: ${action.payload}`);
		return {
			...state,
			title: action.payload
		};
	}
	}
	return state;
}

