import React, {RefObject} from 'react';
import {Point} from '../../models/types';

type SelBorderProps = {
    elemId: string,
    elemType: string,
    elemPos: Point,
    elemWidth: number,
    elemHeight: number,
    topLeftPointRef: RefObject<SVGCircleElement>,
    topRightPointRef: RefObject<SVGCircleElement>,
    botLeftPointRef: RefObject<SVGCircleElement>,
    botRightPointRef: RefObject<SVGCircleElement>,
	// elemRef: RefObject<SVGTextElement> | null
}

export function SelectionBorder(props: SelBorderProps) {
	let selBorderRect = <></>;
	let rect = <rect/>;
	const bordThick = 5;

	const topLeftPointX = props.elemPos.x - bordThick;
	const topLeftPointY = props.elemPos.y - bordThick;

	const topRightPointX = props.elemPos.x + props.elemWidth + bordThick;
	const topRightPointY = props.elemPos.y - bordThick;

	const botLeftPointX = props.elemPos.x - bordThick;
	const botLeftPointY = props.elemPos.y + props.elemHeight + bordThick;

	const botRightPointX = props.elemPos.x + props.elemWidth + bordThick;
	const botRightPointY = props.elemPos.y + props.elemHeight + bordThick;

	rect = <rect
		x={props.elemPos.x - bordThick}
		y={props.elemPos.y - bordThick}
		width={props.elemWidth + bordThick * 2}
		height={props.elemHeight + bordThick * 2}
		stroke='black'
		strokeWidth='1'
		strokeDasharray='10, 7'
		fill='none'
	/>;

	selBorderRect = <>
		{rect}
		<circle ref={props.topLeftPointRef} cx={topLeftPointX} cy={topLeftPointY} r={4} fill='black' stroke='black'/>
		<circle ref={props.topRightPointRef} cx={topRightPointX} cy={topRightPointY} r={4} fill='black' stroke='black'/>
		<circle ref={props.botLeftPointRef} cx={botLeftPointX} cy={botLeftPointY} r={4} fill='black' stroke='black'/>
		<circle ref={props.botRightPointRef} cx={botRightPointX} cy={botRightPointY} r={4} fill='black' stroke='black'/>
	</>;
	return selBorderRect;
}