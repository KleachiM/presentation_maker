import {Presentation} from './types';

export const pres: Presentation = {
	timeline: [],
	timelinePosition: 0,
	title: 'Presentation',
	display_mode: 'presentation',
	active_slide: 'slide0',
	active_slide_index: 0,
	selected_elements: [],
	data: [
		{
			id: 'slide0',
			background: 'white',
			transition_style: 'standart',
			scale: 100,
			slide_data: []
		},
	],
	last_selected_text_id: '',
	currentTool: null,
};