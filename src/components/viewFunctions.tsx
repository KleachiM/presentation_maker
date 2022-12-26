import {Slide} from "../models/types";
import {MainSlideBlock} from "./blocks/MainSlideBlock";
import {MiniSlideBlock} from "./blocks/MiniSlideBlock";

type slideElementsPayload = {
    slide: Slide,
    isBigSlide: boolean
}
export function getSlideSvgElements(payload: slideElementsPayload): Array<JSX.Element> {
    let svgSlideElements: Array<JSX.Element> = [];
    const slideElements = {...payload.slide.slide_data}

    for (let i = 0; i < payload.slide.slide_data.length; i++) {
        svgSlideElements.push(
            payload.isBigSlide
                ? <MainSlideBlock key={slideElements[i].id} block={slideElements[i]}/>
                : <MiniSlideBlock key={slideElements[i].id} block={slideElements[i]}/>
        )
    }

    return svgSlideElements;
}

export function getScaleValue(isSmall: boolean): number {
    return isSmall ? 5 : 1;
}