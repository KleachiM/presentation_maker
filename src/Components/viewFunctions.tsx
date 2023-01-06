import {Slide} from '../Models/types';
import {MainSlideBlock} from './Blocks/MainSlideBlock';
import {MiniSlideBlock} from './Blocks/MiniSlideBlock';
import {RefObject} from 'react';

type slideElementsPayload = {
    slide: Slide,
    isBigSlide: boolean,
    mainSvgRef?: RefObject<SVGSVGElement>
}
export function getSlideSvgElements(payload: slideElementsPayload): Array<JSX.Element> {
	const svgSlideElements: Array<JSX.Element> = [];
	const slideElements = {...payload.slide.slide_data};
	const mainSvgRef = payload.mainSvgRef;

	for (let i = 0; i < payload.slide.slide_data.length; i++) {
		svgSlideElements.push(
			payload.isBigSlide
				? <MainSlideBlock key={slideElements[i].id} block={slideElements[i]} mainSvgRef={mainSvgRef}/>
				: <MiniSlideBlock key={slideElements[i].id} block={slideElements[i]}/>
		);
	}

	return svgSlideElements;
}

export function getScaleValue(isSmall: boolean): number {
	return isSmall ? 5 : 1;
}