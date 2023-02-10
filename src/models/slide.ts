import {Slide, Presentation} from './types';

export function createSlide(): Slide  {
	return {
		id: `${new Date().getTime()}${Math.random()}`,
		background: 'white',
		transition_style: 'standart',
		scale: 100,
		slide_data: []
	};
}