import React, {RefObject} from 'react';
import {TextElem} from '../../models/types';
import {getScaleValue} from '../viewFunctions';
import {store} from '../../store';
import {presentationActions} from '../../store/presentation';

type TextElemProps = {
    textElem: TextElem,
    isSmallElem: boolean,
	elem_ref: RefObject<HTMLTextAreaElement>
	selectionBorder?: JSX.Element
}

export function TextBlock(props: TextElemProps) {
	const scale = getScaleValue(props.isSmallElem);
	return <>
		<foreignObject
			// ref={props.elem_ref}
			x={props.textElem.position.x / scale}
			y={props.textElem.position.y / scale}
			width={props.textElem.width / scale}
			height={props.textElem.height / scale}
		>
			<textarea
				ref={props.elem_ref}
				defaultValue={props.textElem.text_value}
				wrap={'on'}
				readOnly={props.isSmallElem}
				onDoubleClick={(event) => {
					if (!props.isSmallElem) {
						event.preventDefault();
						props.elem_ref.current?.focus();
					}
				}}
				onBlur={(event) => {
					if (!props.isSmallElem) {
						store.dispatch(presentationActions.setText(event.target.value));
					}
				}}
				style={{
					border: 'unset',
					outline: 'unset',
					width: props.textElem.width,
					height: props.textElem.height,
					color: props.textElem.font_color,
					fontSize: props.textElem.font_size / scale,
					backgroundColor: 'transparent',
					fontStyle: props.textElem.font_style,
					fontWeight: props.textElem.font_weight,
					textDecoration: props.textElem.text_decoration
				}}
			/>
		</foreignObject>
		{props.selectionBorder}
	</>;
}