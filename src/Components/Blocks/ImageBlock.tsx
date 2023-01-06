import React, {RefObject} from 'react';
import {ImageElem} from '../../Models/types';
import {getScaleValue} from '../viewFunctions';
import {store} from '../../index';
import {setElemChecked} from '../../Actions/Actions';

type ImageElemProps = {
    imageElem: ImageElem,
    isSmallElem: boolean,
    elem_ref: RefObject<SVGImageElement>,
}

export function ImageBlock(props: ImageElemProps) {
	const scale = getScaleValue(props.isSmallElem);
	return <>
		<image
			ref={props.elem_ref}
			href={props.imageElem.source}
			x={props.imageElem.position.x / scale}
			y={props.imageElem.position.y / scale}
			width={(props.imageElem.width) / scale}
			height={(props.imageElem.height) / scale}
			// если это миниатюра, то обработчик события не невешивается
			onMouseDown={() => props.isSmallElem ? void(0) : store.dispatch(setElemChecked(props.imageElem.id))}
		/>
	</>;
}