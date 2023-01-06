import React, {RefObject, useRef, useState} from 'react';
import {TextBlock} from './TextBlock';
import {ImageBlock} from './ImageBlock';
import {GraphBlock} from './GraphBlock';
import {useDragAndDropElement} from '../../CustomHooks/ElementMouseEvents';
import {GraphElem, ImageElem, TextElem} from '../../Models/types';

type SlideBlockProps = {
    block: TextElem | ImageElem | GraphElem,
    mainSvgRef: RefObject<SVGSVGElement> | undefined
}

export function MainSlideBlock(props: SlideBlockProps) {
	const ref = useRef<SVGTextElement & SVGImageElement & SVGCircleElement & SVGRectElement & SVGPolygonElement>(null);
	const curr_pos = props.block.position;
	const mainSvgRef = props.mainSvgRef;
	const [pos, setPos] = useState(curr_pos);
	useDragAndDropElement({ref, setPos, curr_pos, mainSvgRef});
	props.block.position = pos;
	let svgElem: JSX.Element = <rect/>;
	if (props.block.type === 'text') {
		svgElem = <TextBlock textElem={props.block} isSmallElem={false} elem_ref={ref}/>;
	}
	if (props.block.type === 'image') {
		svgElem = <ImageBlock imageElem={props.block} isSmallElem={false} elem_ref={ref}/>;
	}
	if (props.block.type === 'graphic') {
		svgElem = <GraphBlock graphElem={props.block} isSmallElem={false} elem_ref={ref}/>;
	}
	return svgElem;
}