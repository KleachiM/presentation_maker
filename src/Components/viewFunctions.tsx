import {Slide} from '../models/types';
import {MainSlideBlock} from './Blocks/MainSlideBlock';
import {MiniSlideBlock} from './Blocks/MiniSlideBlock';
import React, {RefObject} from 'react';

type slideElementsPayload = {
    slide: Slide,
    isBigSlide: boolean,
    mainSvgRef?: RefObject<SVGSVGElement>,
	selectedElements?: Array<string>,
	slidePos: number,
}
export function getSlideSvgElements(payload: slideElementsPayload): Array<JSX.Element> {
	const svgSlideElements: Array<JSX.Element> = [];
	const slideElements = {...payload.slide.slide_data};
	const mainSvgRef = payload.mainSvgRef;
	const slide = payload.slide;

	for (let i = 0; i < payload.slide.slide_data.length; i++) {
		svgSlideElements.push(
			payload.isBigSlide
				? <MainSlideBlock
					key={slideElements[i].id}
					block={slideElements[i]}
					mainSvgRef={mainSvgRef}
					slide={slide}
					selectedElements={payload.selectedElements}
					slideDataPos={i}
					slidePos={payload.slidePos}
				/>
				: <MiniSlideBlock key={slideElements[i].id} block={slideElements[i]}/>
		);
	}

	return svgSlideElements;
}

export function getScaleValue(isSmall: boolean): number {
	return isSmall ? 4 : 1;
}