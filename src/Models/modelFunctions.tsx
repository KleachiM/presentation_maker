import {Point, Slide} from './types';

export function getElementPosition(slides: Array<Slide>, active_slide: Slide, elem_id: string): Point {
	const active_slide_index = slides.map(item => item.id).indexOf(active_slide.id);
	const active_elem_index = slides[active_slide_index].slide_data.map(item => item.id).indexOf(elem_id);
	const active_elem = active_slide.slide_data[active_elem_index];
	return {
		x: active_elem.position.x,
		y: active_elem.position.y
	};
}

export function updElemPosition(slide: Slide, elemId: string, newPos: Point): Slide {
	const changedElemIndex = slide.slide_data.map(item => item.id).indexOf(elemId);
	slide.slide_data[changedElemIndex].position = newPos;
	return slide;
}

export function updElemSize(slide: Slide, elemId: string, newWidth: number, newHeight: number): Slide {
	const changedElemIndex = slide.slide_data.map(item => item.id).indexOf(elemId);
	slide.slide_data[changedElemIndex].width = newWidth;
	slide.slide_data[changedElemIndex].height = newHeight;
	return slide;
}