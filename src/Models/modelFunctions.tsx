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