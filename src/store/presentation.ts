import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Point, Slide, SlideElement} from '../models/types';
import {pres} from '../models/data';
import {setElemPosition} from '../Actions/Actions';
import MiniSlides from '../Components/Miniatures/Minislides/MiniSlides';

type initialStateType = {
    display_mode: string;
    data: Slide[];
    active_slide: string;
    active_slide_index: number;
    title: string;
    selected_elements: string[];
}

const initialState: initialStateType = pres;

const presentation = createSlice({
	name: 'presentation',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => ({...state, title: action.payload}),
		setDisplayMode: (state, action: PayloadAction<string>) => ({...state, display_mode: action.payload}),
		setActiveSlide: (state, action: PayloadAction<string>) => ({...state, active_slide: action.payload}),
		setActiveSlideIndex: (state, action: PayloadAction<number>) => ({...state, active_slide_index: action.payload}),
		setSelectedElements: (state, action: PayloadAction<string[]>) => ({
			...state,
			selected_elements: action.payload
		}),
		setData: (state, action: PayloadAction<Slide[]>) => ({...state, data: action.payload}),
		setElemPosition:(state, action: PayloadAction<{
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
		addFig: (state, action: PayloadAction<{element: SlideElement}>) => {
			state.data[state.active_slide_index].slide_data.push(action.payload.element);
		},
		addSlide: (state, action: PayloadAction<{element: Slide}>) => {
			state.data.push(action.payload.element);
		},
		zIndexUp: (state, action: PayloadAction) => {
			const active_elem_index = state.data[state.active_slide_index].slide_data.map(i => i.id).indexOf(state.selected_elements[0]);
			const slide_data = state.data[state.active_slide_index].slide_data;
			const slide_data_len = slide_data.length;
			if (slide_data.length > 0 && active_elem_index < slide_data_len) {
				[slide_data[active_elem_index], slide_data[active_elem_index + 1]] = [slide_data[active_elem_index+1], slide_data[active_elem_index]];
			}
		},
		zIndexDown: (state) => {
			const active_elem_index = state.data[state.active_slide_index].slide_data.map(i => i.id).indexOf(state.selected_elements[0]);
			const slide_data = state.data[state.active_slide_index].slide_data;
			if (slide_data.length > 0 && active_elem_index > 0) {
				[slide_data[active_elem_index - 1], slide_data[active_elem_index]] = [slide_data[active_elem_index], slide_data[active_elem_index - 1]];
			}
		},
		setDisplayModeView: (state) => {
			state.display_mode = 'preview';
			const elem = document.querySelector('.mainSlide');
			elem?.requestFullscreen();
		}
	}
});

export const presentationReducer = presentation.reducer;
export const presentationActions = presentation.actions;