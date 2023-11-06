import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Point, Presentation, Slide, SlideElement, TextElem} from '../models/types';
import {pres} from '../models/data';
import {deepClone, walkOnSlideElements} from '../utils/utils';
import {TOOLS} from '../const/tools';
import {AppState, store} from './index';
import React from 'react';
import {jsPDF} from 'jspdf';
import 'svg2pdf.js';
import {Svg2pdfOptions} from 'svg2pdf.js';

const initialState: Presentation = pres;

const presentation = createSlice({
    name: 'presentation',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => ({...state, title: action.payload}),
        setActiveSlide: (state, action: PayloadAction<string>) => ({...state, active_slide: action.payload}),
        setActiveSlideUp: (state) => {
            if (state.data.length !== 1 && state.active_slide_index !== 0) {
                state.active_slide_index--;
                state.active_slide = state.data[state.active_slide_index].id;
            }
        },
        setActiveSlideDown: (state) => {
            if (state.data.length !== 1) {
                state.active_slide_index++;
                state.active_slide = state.data[state.active_slide_index].id;
            }
        },
        setActiveSlideIndex: (state, action: PayloadAction<number>) => ({...state, active_slide_index: action.payload}),
        setSelectedElements: (state, action: PayloadAction<string[]>) => {
            state.selected_elements = action.payload;
            state.currentTool = null;
            if (action.payload.length) {
                walkOnSlideElements<TextElem>(state, el => {
                    action.payload.includes(el.id) && (state.currentTool = TOOLS.ADD_TEXT);
                    state.last_selected_text_id = el.id;
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
            saveUndo(state);
        },
        addFig: (state, action: PayloadAction<{ element: SlideElement }>) => {
            state.data[state.active_slide_index].slide_data.push(action.payload.element);
            state.selected_elements = [action.payload.element.id];
            saveUndo(state);
        },
        addSlide: (state, action: PayloadAction<{ element: Slide }>) => {
            state.data.push(action.payload.element);
            state.active_slide_index = state.data.length - 1;
            state.active_slide = state.data[state.active_slide_index].id;
            saveUndo(state);
        },
        zIndexUp: (state, action: PayloadAction) => {
            const active_elem_index = state.data[state.active_slide_index].slide_data.map(i => i.id).indexOf(state.selected_elements[0]);
            const slide_data = state.data[state.active_slide_index].slide_data;
            const slide_data_len = slide_data.length;
            if (slide_data.length > 0 && active_elem_index < slide_data_len - 1) {
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
        savePresentationToJson: (state, action: PayloadAction<string>) => {
            const presentationName = state.title + '.json';
            const newVariable: any = window.navigator;
            const presentationFile = new Blob([JSON.stringify(state)], {type: 'json'});
            if (newVariable && newVariable.msSaveOrOpenBlob) {
                newVariable.msSaveOrOpenBlob(presentationFile, presentationName);
            } else {
                const a = document.createElement('a'),
                    url = URL.createObjectURL(presentationFile);
                a.href = url;
                a.download = presentationName;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        },
        UploadPresentationFromJson: (state, action: PayloadAction<string>) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.id = 'inputFile';
            document.body.appendChild(input);
            input.onchange = function () {
                const files = input.files as FileList;
                const f: File = files[0] as File;
                const reader = new FileReader();
                reader.onload = function (e) {
                    const target: any = e.target;
                    const presentationData: Presentation = JSON.parse(target.result) as Presentation;
                    store.dispatch(presentationActions.setTitle(presentationData.title));
                    store.dispatch(presentationActions.setData(presentationData.data));
                };
                reader.onerror = function (e) {
                    alert('Error loading');
                };
                reader.readAsText(f);
            };
            input.click();
            setTimeout(function () {
                document.body.removeChild(input);
            }, 0);
        },
        deleteActiveSlide: (state) => {
            if (state.data.length > 1) {
                state.data.splice(state.active_slide_index, 1);
                state.active_slide_index = state.active_slide_index === 0 ? 0 : state.active_slide_index - 1;
                state.active_slide = state.data[state.active_slide_index].id;
            } else {
                state.data[0].slide_data = [];
            }
            saveUndo(state);
        },
        deleteSelectedElements: (state) => {
            state.selected_elements.forEach((element) => {
                state.data[state.active_slide_index].slide_data = state.data[state.active_slide_index].slide_data.filter(item => item.id !== element);
            });
            saveUndo(state);
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
            saveUndo(state);
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            if (state.selected_elements.length) {
                walkOnSlideElements<TextElem>(state, (el) => {
                    el.font_size = action.payload;
                }, 'text');
            }
            saveUndo(state);
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            if (state.selected_elements.length) {
                walkOnSlideElements<TextElem>(state, (el) => {
                    el.font_family = action.payload;
                }, 'text');
            }
            saveUndo(state);
        },
        upFontSize: (state) => {
            if (state.selected_elements.length) {
                walkOnSlideElements<TextElem>(state, (el) => {
                    el.font_size = parseInt(String(el.font_size)) + 1;
                }, 'text');
            }
            saveUndo(state);
        },
        downFontSize: (state) => {
            if (state.selected_elements.length) {
                walkOnSlideElements<TextElem>(state, (el) => {
                    el.font_size = parseInt(String(el.font_size)) - 1;
                }, 'text');
            }
            saveUndo(state);
        },
        toggleItalic: (state, action: PayloadAction) => {
            if (state.selected_elements.length) {
                const currentSlide = state.data[state.active_slide_index];
                currentSlide.slide_data.forEach((s) => {
                    if (state.selected_elements.includes(s.id) && s.type === 'text') {
                        s.font_style = s.font_style === 'italic' ? 'normal' : 'italic';
                    }
                });
            }
            saveUndo(state);
        },
        toggleBold: (state, action: PayloadAction) => {
            if (state.selected_elements.length) {
                const currentSlide = state.data[state.active_slide_index];
                currentSlide.slide_data.forEach((s) => {
                    if (state.selected_elements.includes(s.id) && s.type === 'text') {
                        s.font_weight = s.font_weight === 400 ? 700 : 400;
                    }
                });
            }
            saveUndo(state);
        },
        toggleUnderlined: (state, action: PayloadAction) => {
            if (state.selected_elements.length) {
                const currentSlide = state.data[state.active_slide_index];
                currentSlide.slide_data.forEach((s) => {
                    if (state.selected_elements.includes(s.id) && s.type === 'text') {
                        s.text_decoration = s.text_decoration === 'none' ? 'underline' : 'none';
                    }
                });
            }
            saveUndo(state);
        },
        setCurrentTool: (state, action: PayloadAction<TOOLS>) => {
            state.currentTool = action.payload;
        },
        setText: (state, action: PayloadAction<string>) => {
            const currentSlide = state.data[state.active_slide_index];
            currentSlide.slide_data.forEach((s) => {
                if (s.id === state.last_selected_text_id && s.type === 'text') {
                    s.text_value = action.payload;
                }
            });
            saveUndo(state);
        },
        saveToPDF: (state, action: PayloadAction<string>) => {
            const presentationName = state.title + '.pdf';
            const doc = new jsPDF();
            const elements = document.querySelectorAll('[xmlns]');
            async function addElements(element: NodeListOf<Element>, options?: Svg2pdfOptions) {
                for (let index = 0; index < elements.length - 1 ; index++) {
                    if (index > 0) {
                        doc.addPage();
                    }
                    await doc.svg(elements[index], {    x:1,
                        y:1,
                        width: 1920,
                        height: 1080});
                    await new Promise(resolve => setTimeout(resolve, 100)); // задержка в 100 мс
                }
            }
            addElements(elements).then(() => {
                doc.save(presentationName);
            });
        },
        undo: (state, action: PayloadAction<string>) => {
            if (state.timelinePosition === 0) {
                state.active_slide_index = initialState.active_slide_index;
                state.selected_elements = initialState.selected_elements;
                state.data = initialState.data;
                state.title = initialState.title;
            } else {
                const nextTimeline = state.timelinePosition - 1;
                const targetTimeline = nextTimeline > 0 ? nextTimeline : 0;
                const revertState = state.timeline[targetTimeline];
                state.timelinePosition = targetTimeline;
                state.title = revertState.title;
                state.active_slide_index = revertState.active_slide_index;
                state.selected_elements = revertState.selected_elements;
                state.data = revertState.data;
            }
        },
        redo: (state, action: PayloadAction<string>) => {
                const nextTimeline = state.timelinePosition + 1;
            if (state.timeline.length != nextTimeline) {
                const jumpState = state.timeline[nextTimeline];
                state.timelinePosition = nextTimeline;
                state.title = jumpState.title;
                state.active_slide_index = jumpState.active_slide_index;
                state.selected_elements = jumpState.selected_elements;
                state.data = jumpState.data;
            }
        },

    }
});

export const presentationReducer = presentation.reducer;
export const presentationActions = presentation.actions;

function getSnapshot(state: AppState['presentation']) {
    const { timeline, timelinePosition, ...stateData } = state;
    return stateData;
}

function saveUndo(state: AppState['presentation']) {
    if (state.timelinePosition != state.timeline.length - 1 && state.timeline.length) {
        state.timeline.splice(state.timelinePosition);
        state.timelinePosition = state.timeline.length ? state.timeline.length - 1 : 0;
    } else {
        const snap = getSnapshot(state);
        state.timeline.push(snap);
        state.timelinePosition = state.timeline.length ? state.timeline.length - 1 : 0;
    }
}