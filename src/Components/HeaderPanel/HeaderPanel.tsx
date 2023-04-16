import './HeaderPanel.css';
import React from 'react';
import PresentationName from './PresentationName/PresentationName';
import {AppState, store} from '../../store';
import {presentationActions} from '../../store/presentation';
import {createCircle, createRectangle, createTriangle} from '../../models/shapes';
import {addImage} from '../../models/images.';
import {addText} from '../../models/texts';
import {createSlide} from '../../models/slide';
import {debounce, getBase64} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {TOOLS} from '../../const/tools';

export function HeaderPanel() {
	const currentTool = useSelector((s: AppState) => s.presentation.currentTool);
	const currentEl = useSelector((s: AppState) => s.presentation.data[s.presentation.active_slide_index].slide_data.find(el => s.presentation.selected_elements.includes(el.id)));
	const onItemClick = (type: TOOLS) => {
		store.dispatch(presentationActions.setCurrentTool(type));
		if (type === TOOLS.ADD_SLIDE) {
			store.dispatch(presentationActions.addSlide({element: createSlide()}));
		}
		if (type === TOOLS.DELETE_SLIDE) {
			store.dispatch(presentationActions.deleteActiveSlide());
		}
		if (type === TOOLS.RECTANGLE) {
			store.dispatch(presentationActions.addFig({element: createRectangle('red')}));
		}
		if (type === TOOLS.TRIANGLE) {
			store.dispatch(presentationActions.addFig({element: createTriangle('blue')}));
		}
		if (type === TOOLS.CIRCLE) {
			store.dispatch(presentationActions.addFig({element: createCircle('black')}));
		}
		if (type === TOOLS.ADD_TEXT) {
			store.dispatch(presentationActions.addFig({element: addText('')}));
		}
		if (type === TOOLS.PREVIEW) {
			store.dispatch(presentationActions.setDisplayMode('preview'));
		}
		if (type === TOOLS.SAVE) {
			store.dispatch(presentationActions.savePresentationToJson(''));
		}
		if (type === TOOLS.UPLOAD) {
			store.dispatch(presentationActions.UploadPresentationFromJson(''));
		}
		if (type === TOOLS.DO_PDF)
		{
			store.dispatch(presentationActions.saveToPDF(''));
		}
	};

	const isActiveTextTool = currentTool === TOOLS.ADD_TEXT;
	const onChangeColor = debounce((ev:  React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(presentationActions.setColor(ev.target.value));
	}, 100);

	return <div className="header-panel">
		<PresentationName />
		<div className="buttons-panel">
			<span className="material-symbols-outlined click-button" title="Add slide" onClick={() => onItemClick(TOOLS.ADD_SLIDE)}>add</span>
			<span className="material-symbols-outlined click-button" title="Delete slide" onClick={() => onItemClick(TOOLS.DELETE_SLIDE)}>remove</span>
			<span className="material-symbols-outlined click-button" title="Undo" onClick={() => onItemClick(TOOLS.UNDO)}>undo</span>
			<span className="material-symbols-outlined click-button" title="Redo" onClick={() => onItemClick(TOOLS.REDO)}>redo</span>
			<span className="material-symbols-outlined click-button" title="Add rectangle" onClick={() => onItemClick(TOOLS.RECTANGLE)}>rectangle</span>
			<span className="material-symbols-outlined click-button" title="Add triangle" onClick={() => onItemClick(TOOLS.TRIANGLE)}>change_history</span>
			<span className="material-symbols-outlined click-button" title="Add circle" onClick={() => onItemClick(TOOLS.CIRCLE)}>circle</span>
			<label htmlFor="select_pic">
				<div className="buttons-panel">
				<span className="material-symbols-outlined click-button">image</span>
				</div>
			</label>
			<span
				className={`material-symbols-outlined click-button ${isActiveTextTool ? 'active-tool' : ''}`}
				title="Add text block"
				onClick={() => onItemClick(TOOLS.ADD_TEXT)}
			>
				text_fields
			</span>
			{isActiveTextTool && (
				<div className="text-edit-panel buttons-panel">
					<select onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
						store.dispatch(presentationActions.setFontFamily(ev.target.value));
					}}>
						<option value='roboto'>Roboto</option>
						<option value='montserrat'>Montserrat</option>
						<option value='opensans'>OpenSans</option>
						<option value='zeyada'>Zeyada</option>
					</select>
					<input
						className="font-size-input"
						type="number"
						onChange={(ev) => {
							store.dispatch(presentationActions.setFontSize(ev.target.value as unknown as number));
						}}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						value={currentEl?.font_size as number}
					/>
					<span className="material-symbols-outlined click-button" onClick={() => {
						store.dispatch(presentationActions.upFontSize());
					}}>text_increase</span>
					<span className="material-symbols-outlined click-button" onClick={() => {
						store.dispatch(presentationActions.downFontSize());
					}}>text_decrease</span>
					<span className="material-symbols-outlined click-button" onClick={() => {
						store.dispatch(presentationActions.toggleItalic());
					}}>format_italic</span>
					<span className="material-symbols-outlined click-button" onClick={() => {
						store.dispatch(presentationActions.toggleBold());
					}}>format_bold</span>
					<span className="material-symbols-outlined click-button" onClick={() => {
						store.dispatch(presentationActions.toggleUnderlined());
					}}>format_underlined</span>
				</div>
			)}
			<span className="material-symbols-outlined click-button" title="Save to pdf" onClick={() => onItemClick(TOOLS.DO_PDF)}>picture_as_pdf</span>
			<span className="material-symbols-outlined click-button" title="Save to JSON" onClick={() => onItemClick(TOOLS.SAVE)}>save</span>
			<span className="material-symbols-outlined click-button" title="Upload presentation" onClick={() => onItemClick(TOOLS.UPLOAD)}>upload</span>
			<span className="material-symbols-outlined click-button" title="Preview" onClick={() => onItemClick(TOOLS.PREVIEW)}>preview</span>
			<span className="material-symbols-outlined click-button" title="Up to front" onClick={zIndexDownHandler}>move_selection_down</span>
			<span className="material-symbols-outlined click-button" title="Push down" onClick={zIndexUpHandler}>move_selection_up</span>
			<label htmlFor="select_color">
				<div className="buttons-panel">
				<span className="material-symbols-outlined click-button" title="Color fill">format_color_fill</span>
				</div>
			</label>
		</div>
		<input
			type={'file'}
			id="select_pic"
			onChange={async (ev) => {
				const res = await getBase64((ev.target.files || [])[0] as File);
				store.dispatch(presentationActions.addFig({element: addImage(res)}));
			}}
			style={{display: 'none'}}
		/>
		<input
			type={'color'}
			id="select_color"
			onChange={onChangeColor}
			style={{display: 'none'}}
		/>
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
