import {getTestData} from "../models/data";
import {Presentation} from "../models/types";

export function mainReducer(state = getTestData(), action: any): Presentation {
    switch (action.type) {
        case 'SET_ACTIVE_SLIDE':
            return {
                ...state,
                active_slide: action.payload
            };
    }
    return state;
}