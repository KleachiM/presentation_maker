import './HeaderPanel.css';
import React from 'react';
import PresentationName from './PresentationName/PresentationName';
import {store} from '../../store';
import {presentationActions} from '../../store/presentation';
import {createCircle, createRectangle, createTriangle} from '../../models/shapes';
import {addImage} from '../../models/images.';
import {addText} from '../../models/texts';
import {addSlide} from '../../models/slide';

enum ButtonsType  {
	ADD_SLIDE = 'ADD_SLIDE',
	UNDO = 'UNDO',
	REDO = 'REDO',
	CIRCLE = 'CIRCLE',
	TRIANGLE = 'TRIANGLE',
	RECTANGLE = 'RECTANGLE',
	ADD_TEXT = 'ADD_TEXT',
	ADD_PIC = 'ADD_PIC',
	SAVE = 'SAVE',
	UPLOAD = 'UPLOAD',
	DO_PDF = 'DO_PDF',
	PREVIEW = 'PREVIEW'
}

export function HeaderPanel() {
	const onItemClick = (type: ButtonsType) => {
		if (type === ButtonsType.ADD_SLIDE) {
			store.dispatch(presentationActions.addSlide({element: addSlide()}));
		}
		if (type === ButtonsType.RECTANGLE) {
			store.dispatch(presentationActions.addFig({element: createRectangle('red')}));
		}
		if (type === ButtonsType.TRIANGLE) {
			store.dispatch(presentationActions.addFig({element: createTriangle('blue')}));
		}
		if (type === ButtonsType.CIRCLE) {
			store.dispatch(presentationActions.addFig({element: createCircle('black')}));
		}
		if (type === ButtonsType.ADD_PIC) {
			store.dispatch(presentationActions.addFig({element: addImage('https://www.coweb.ru/upload/coweb.png')}));
		}
		if (type === ButtonsType.ADD_TEXT) {
			store.dispatch(presentationActions.addFig({element: addText('Введите свой текст')}));
		}
		if (type === ButtonsType.PREVIEW) {
			store.dispatch(presentationActions.setDisplayModeView());
		}
	};

	return <div className="header-panel">
		<PresentationName />
		<div>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.ADD_SLIDE)}>add</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.UNDO)}>undo</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.REDO)}>redo</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.RECTANGLE)}>rectangle</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.TRIANGLE)}>change_history</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.CIRCLE)}>circle</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.ADD_PIC)}>image</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.ADD_TEXT)}>feed</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.DO_PDF)}>picture_as_pdf</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.SAVE)}>save</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.UPLOAD)}>upload</span>
			<span className="material-symbols-outlined click-button" onClick={() => onItemClick(ButtonsType.PREVIEW)}>preview</span>
			<span className="material-symbols-outlined click-button" onClick={zIndexDownHandler}>move_selection_down</span>
			<span className="material-symbols-outlined click-button" onClick={zIndexUpHandler}>move_selection_up</span>
		</div>
	</div>;
}

const zIndexUpHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
	event.preventDefault();
	store.dispatch(presentationActions.zIndexUp());
};

const zIndexDownHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
	event.preventDefault();
	store.dispatch(presentationActions.zIndexDown());
};
