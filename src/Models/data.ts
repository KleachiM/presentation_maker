import {Presentation} from './types';

const pres: Presentation = {
	title: 'Tst title',
	display_mode: 'presentation',
	active_slide: '0',
	selected_elements: [],
	data: [
		{
			id: '0',
			background: 'blue',
			transition_style: 'standart',
			scale: 100,
			slide_data: [
				{
					id: 'text1',
					type: 'text',
					text_value: 'some text',
					font_size: 36,
					font_color: 'red',
					font_family: 'Noto Sans',
					font_weight: 5,
					font_style: 'Bold',
					position: {x: 200, y: 50},
					width: 250,
					height: 50
				},
				{
					id: 'image1',
					type: 'image',
					source: 'https://www.coweb.ru/upload/coweb.png',
					source_type: 'ref',
					position: {x: 200, y: 200},
					width: 200,
					height: 200,
				},
				{
					id: 'graph11',
					type: 'graphic',
					color: 'red',
					gr_obj_type: 'circle',
					position: {x: 600, y: 300},
					width: 150,
					height: 150
				}
			]
		},
		{
			id: '1',
			background: 'blue',
			transition_style: 'standart',
			scale: 100,
			slide_data: [
				{
					id: 'graph21',
					type: 'graphic',
					color: 'green',
					gr_obj_type: 'rectangle',
					position: {x: 20, y: 20},
					width: 80,
					height: 100
				},
				{
					id: 'graph22',
					type: 'graphic',
					color: 'blue',
					gr_obj_type: 'triangle',
					position: {x: 300, y: 300},
					width: 100,
					height: 100
				}
			]
		},
		{
			id: '2',
			background: 'blue',
			transition_style: 'standart',
			scale: 100,
			slide_data: []
		}
	]
};

function getTestData(): Presentation {
	return pres;
}

export {
	getTestData,
};