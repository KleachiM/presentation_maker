import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Point, Presentation, Slide, SlideElement, TextElem} from '../models/types';
import {pres} from '../models/data';
import {walkOnSlideElements} from '../utils/utils';
import {TOOLS} from '../const/tools';

const initialState: Presentation = pres;

const presentation = createSlice({
	name: 'presentation',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => ({...state, title: action.payload}),
		// setDisplayMode: (state, action: PayloadAction<string>) => ({...state, display_mode: action.payload}),
		setActiveSlide: (state, action: PayloadAction<string>) => ({...state, active_slide: action.payload}),
		setActiveSlideUp: (state) => {
			if (state.data.length !== 1 && state.active_slide_index !== 0) {
				state.active_slide_index--;
				state.active_slide = state.data[state.active_slide_index].id;
			}
		},
		setActiveSlideDown:(state) => {
			if (state.data.length !== 1) {
				state.active_slide_index++;
				state.active_slide = state.data[state.active_slide_index].id;
			}
		},
		setActiveSlideIndex: (state, action: PayloadAction<number>) => ({...state, active_slide_index: action.payload}),
		setSelectedElements: (state, action: PayloadAction<string[]>) => {
			state.selected_elements = action.payload;
			// debugger
			state.currentTool = null;
			if (action.payload.length) {
				walkOnSlideElements<TextElem>(state, el => {
					action.payload.includes(el.id) && (state.currentTool = TOOLS.ADD_TEXT);
				}, 'text');
			}
		},
		setData: (state, action: PayloadAction<Slide[]>) => ({...state, data: action.payload}),
		setElemPosition: (state, action: PayloadAction<{
			slide: Slide,
			elemId: string,
			newPos: Point
		}>) => {
			const editedSlideIndex = state.data.findIndex(s => s.id === action.payload.slide.id);
			const editedSlide = state.data[editedSlideIndex];
			const editedItem = editedSlide.slide_data.find((i) => i.id === action.payload.elemId);
			editedItem!.position = action.payload.newPos;
		},

		setElementSize: (state, action: PayloadAction<{
			slide: Slide,
			elemId: string,
			newWidth: number,
			newHeight: number
		}>) => {
			const editedSlideIndex = state.data.findIndex(s => s.id === action.payload.slide.id);
			const editedSlide = state.data[editedSlideIndex];
			const editedItem = editedSlide.slide_data.find((i) => i.id === action.payload.elemId);
			editedItem!.width = action.payload.newWidth;
			editedItem!.height = action.payload.newHeight;
		},
		addFig: (state, action: PayloadAction<{ element: SlideElement }>) => {
			state.data[state.active_slide_index].slide_data.push(action.payload.element);
			state.selected_elements = [action.payload.element.id];
		},
		addSlide: (state, action: PayloadAction<{ element: Slide }>) => {
			state.data.push(action.payload.element);
			state.active_slide_index++;
			state.active_slide = state.data[state.active_slide_index].id;
		},
		zIndexUp: (state, action: PayloadAction) => {
			const active_elem_index = state.data[state.active_slide_index].slide_data.map(i => i.id).indexOf(state.selected_elements[0]);
			const slide_data = state.data[state.active_slide_index].slide_data;
			const slide_data_len = slide_data.length;
			if (slide_data.length > 0 && active_elem_index < slide_data_len) {
				[slide_data[active_elem_index], slide_data[active_elem_index + 1]] = [slide_data[active_elem_index + 1], slide_data[active_elem_index]];
			}
		},
		zIndexDown: (state) => {
			const active_elem_index = state.data[state.active_slide_index].slide_data.map(i => i.id).indexOf(state.selected_elements[0]);
			const slide_data = state.data[state.active_slide_index].slide_data;
			if (slide_data.length > 0 && active_elem_index > 0) {
				[slide_data[active_elem_index - 1], slide_data[active_elem_index]] = [slide_data[active_elem_index], slide_data[active_elem_index - 1]];
			}
		},
		setDisplayMode: (state, action: PayloadAction<string>) => {
			if (action.payload === 'preview' && state.display_mode !== 'preview') {
				state.display_mode = 'preview';
				state.selected_elements = [];
				const elem = document.querySelector('.mainSlide');
				elem?.requestFullscreen();
			}
			if (action.payload === 'presentation') {
				state.display_mode = 'presentation';
			}
		},
		deleteActiveSlide: (state) => {
			if (state.data.length > 1) {
				state.data.splice(state.active_slide_index, 1);
				state.active_slide = state.data[state.active_slide_index].id;
			} else {
				state.data[0].slide_data = [];
			}
		},
		deleteSelectedElements: (state) => {
			state.selected_elements.forEach((element) => {
				state.data[state.active_slide_index].slide_data = state.data[state.active_slide_index].slide_data.filter(item => item.id !== element);
			});
		},
		setColor: (state, action: PayloadAction<string>) => {
			const currentSlide = state.data[state.active_slide_index];
			if (state.selected_elements.length) {
				const selected = state.selected_elements;
				currentSlide.slide_data.forEach((s) => {
					if (selected.includes(s.id)) {
						if (s.type === 'graphic') {
							s.color = action.payload;
						} else if (s.type === 'text') {
							s.font_color = action.payload;
						}
					}
				});
			} else {
				currentSlide.background = action.payload;
			}
		},
		setFontSize: (state, action: PayloadAction<number>) => {
			if (state.selected_elements.length) {
				walkOnSlideElements<TextElem>(state, (el) => {
					el.font_size = action.payload;
				}, 'text');
			}
		},
		upFontSize: (state) => {
			if (state.selected_elements.length) {
				walkOnSlideElements<TextElem>(state, (el) => {
					el.font_size = parseInt(String(el.font_size)) + 1;
				}, 'text');
			}
		},
		downFontSize: (state) => {
			if (state.selected_elements.length) {
				walkOnSlideElements<TextElem>(state, (el) => {
					el.font_size = parseInt(String(el.font_size)) - 1;
				}, 'text');
			}
		},
		toggleItalic: (state, action: PayloadAction) => {
			if (state.selected_elements.length) {
				walkOnSlideElements<TextElem>(state, (el) => {
					el.font_style = el.font_style === 'italic' ? 'normal' : 'italic';
				}, 'text');
			}
		},
		toggleBold: (state, action: PayloadAction) => {
			if (state.selected_elements.length) {
				walkOnSlideElements<TextElem>(state, (el) => {
					el.font_style = el.font_style === 'normal' ? 'bold' : 'normal';
				}, 'text');
			}
		},
		setCurrentTool: (state, action: PayloadAction<TOOLS>) => {
			state.currentTool = action.payload;
		}
	}
});

export const presentationReducer = presentation.reducer;
export const presentationActions = presentation.actions;