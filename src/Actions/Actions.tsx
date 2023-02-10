import {Point, Slide} from '../models/types';
import {presentationActions} from '../store/presentation';

export function setElemPosition(slide: Slide, elemId: string, newPos: Point) {
	return presentationActions.setElemPosition({
		slide: slide,
		elemId: elemId,
		newPos: newPos
	});
}

export function setElemSize(slide: Slide, elemId: string, newWidth: number, newHeight: number) {
	return presentationActions.setElementSize({
		slide: slide,
		elemId: elemId,
		newWidth: newWidth,
		newHeight: newHeight
	});
}