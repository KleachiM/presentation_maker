import React, {RefObject} from 'react';
import {GraphElem} from '../../models/types';
import {getScaleValue} from '../viewFunctions';

type GraphBlockProps = {
    graphElem: GraphElem,
    isSmallElem: boolean,
    elem_ref: RefObject<SVGCircleElement & SVGPolygonElement & SVGRectElement>,
	selectionBorder?: JSX.Element
}

export function GraphBlock(props: GraphBlockProps) {
	const scale = getScaleValue(props.isSmallElem);
	const gr_obj_type = props.graphElem.gr_obj_type;
	let svgElem = <rect/>;
	if (gr_obj_type === 'triangle') {
		const leftPointX = props.graphElem.position.x / scale;
		const leftPointY = (props.graphElem.position.y + props.graphElem.height) / scale;

		const rightPointX = (props.graphElem.position.x + props.graphElem.width) / scale;
		const rightPointY = (props.graphElem.position.y + props.graphElem.height) / scale;

		const centerPointX = (props.graphElem.position.x + props.graphElem.width / 2) / scale;
		const centerPointY = (props.graphElem.position.y) / scale;

		svgElem = <>
			<polygon
				ref={props.elem_ref}
				points={
					leftPointX + ' ' + leftPointY + ', ' +
					rightPointX + ' ' + rightPointY + ', ' +
					centerPointX + ' ' + centerPointY
				}
				fill={props.graphElem.color}
			/>
			{props.selectionBorder}
		</>;

	}
	if (gr_obj_type === 'rectangle') {
		svgElem = <>
			<rect
				ref={props.elem_ref}
				x={props.graphElem.position.x / scale}
				y={props.graphElem.position.y / scale}
				width={(props.graphElem.width) / scale}
				height={(props.graphElem.height) / scale}
				fill={props.graphElem.color}
			/>
			{props.selectionBorder}
		</>;

	}
	if (gr_obj_type === 'circle') {
		svgElem = <>
			<ellipse
				ref={props.elem_ref}
				cx={(props.graphElem.position.x + props.graphElem.width / 2) / scale}
				cy={(props.graphElem.position.y + props.graphElem.height / 2) / scale}
				rx={(props.graphElem.width / 2) / scale}
				ry={(props.graphElem.height / 2) / scale}
				fill={props.graphElem.color}
			/>
			{props.selectionBorder}
		</>;
	}
	return svgElem;
}