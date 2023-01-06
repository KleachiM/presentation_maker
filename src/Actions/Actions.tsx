import {Point, Slide, StateTypes} from "../Models/types";

export function setActiveSlide(activeSlide: string) {
    return {
        type: StateTypes.SET_ACTIVE_SLIDE,
        payload: activeSlide
    }
}

export function setElemChecked(elemId: string) {
    console.log(`elem with id: ${elemId} checked`)
    return {
        type: StateTypes.SET_ELEM_CHECKED,
        payload: elemId
    }
}

export function setElemPosition(slide: Slide, elemId: string | undefined, newPos: Point) {
    console.log(`set elem ${elemId}`)
    return {
        type: StateTypes.SET_ELEM_NEW_POS,
        payload: {
            slide: slide,
            elemId: elemId,
            newPos: newPos
        }
    }
}