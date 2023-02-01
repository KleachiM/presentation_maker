import './HeaderPanel.css';
import React from 'react';
import PresentationName from './PresentationName/PresentationName';
import {store} from "../../store";
import {presentationActions} from "../../store/presentation";
import {createCircle, createRectangle, createTriangle} from "../../models/shapes";

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
	DO_PDF = 'DO_PDF'
}

export function HeaderPanel() {
	const onItemClick = (type: ButtonsType) => {
		if (type === ButtonsType.ADD_SLIDE) {
			store.dispatch(presentationActions.addFig({element: createRectangle('red')}))
		}
		if (type === ButtonsType.RECTANGLE) {
			store.dispatch(presentationActions.addFig({element: createRectangle('red')}))
		}
		if (type === ButtonsType.TRIANGLE) {
			store.dispatch(presentationActions.addFig({element: createTriangle('blue')}))
		}
		if (type === ButtonsType.CIRCLE) {
			store.dispatch(presentationActions.addFig({element: createCircle('black')}))
		}
	}

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
		</div>
	</div>;
}

