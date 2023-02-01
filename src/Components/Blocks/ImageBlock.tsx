import React, {RefObject} from 'react';
import {ImageElem} from '../../models/types';
import {getScaleValue} from '../viewFunctions';

type ImageElemProps = {
    imageElem: ImageElem,
    isSmallElem: boolean,
    elem_ref: RefObject<SVGImageElement>,
	selectionBorder?: JSX.Element
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
		/>
		{props.selectionBorder}
	</>;
}