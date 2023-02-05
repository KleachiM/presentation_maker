import {Slide, Presentation} from './types';

export function addSlide(): Slide  {
	return {
		id: `${new Date().getTime()}${Math.random()}`,
		background: 'blue',
		transition_style: 'standart',
		scale: 100,
		slide_data: []
	};
}