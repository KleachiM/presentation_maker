import React, {RefObject} from 'react';
import {TextElem} from '../../Models/types';
import {getScaleValue} from '../viewFunctions';
import {store} from '../../index';
import {setElemChecked} from '../../Actions/Actions';

type TextElemProps = {
    textElem: TextElem,
    isSmallElem: boolean,
    elem_ref: RefObject<SVGTextElement>,
}

export function TextBlock(props: TextElemProps) {
	const scale = getScaleValue(props.isSmallElem);
	return <>
		<text
			ref={props.elem_ref}
			x={props.textElem.position.x / scale}
			y={props.textElem.position.y / scale}
			fontSize={props.textElem.font_size / scale}
			fontFamily={props.textElem.font_family}
			fill={props.textElem.font_color}
			fontWeight={props.textElem.font_weight / scale}
			fontStyle={props.textElem.font_style}
			// если это миниатюра, то обработчик события не невешивается
			onMouseDown={() => props.isSmallElem ? void(0) : store.dispatch(setElemChecked(props.textElem.id))}
		>{props.textElem.text_value}</text>
	</>;
}