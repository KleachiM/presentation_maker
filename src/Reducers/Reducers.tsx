import {getTestData} from "../Models/data";
import {Presentation, StateTypes} from "../Models/types";
import {getNewSlide} from "../Models/modelFunctions";

export function mainReducer(state = getTestData(), action: any): Presentation {
    switch (action.type) {
        case StateTypes.SET_ACTIVE_SLIDE:
            return {
                ...state,
                active_slide: action.payload
            };
        case StateTypes.SET_ELEM_CHECKED:
            return state
        case StateTypes.SET_ELEM_NEW_POS:
            const newSlide = getNewSlide(
                action.payload.slide,
                action.payload.elemId,
                action.payload.newPos
            )
            let slides = [...state.data]
            const changedSlideIndex = slides.map(e => e.id).indexOf(newSlide.id)
            slides[changedSlideIndex] = newSlide
            return {
                ...state,
                data: slides
            }
    }
    return state;
}

