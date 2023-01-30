import React, {RefObject, useRef, useState} from 'react';
import {TextBlock} from './TextBlock';
import {ImageBlock} from './ImageBlock';
import {GraphBlock} from './GraphBlock';
import {useDragAndDropElement, useResizeElement} from '../../CustomHooks/ElementMouseEvents';
import {GraphElem, ImageElem, Slide, TextElem} from '../../Models/types';
import {SelectionBorder} from './SelectionBorder';

type SlideBlockProps = {
    block: TextElem | ImageElem | GraphElem,
    mainSvgRef: RefObject<SVGSVGElement> | undefined,
    slide: Slide,
	selectedElements: Array<string> | undefined
}

export function MainSlideBlock(props: SlideBlockProps) {
	const elemRef = useRef<HTMLTextAreaElement & SVGImageElement & SVGCircleElement & SVGRectElement & SVGPolygonElement>(null);

	const topLeftPointRef = useRef<SVGCircleElement | null>(null);
	const topRightPointRef = useRef<SVGCircleElement | null>(null);
	const botLeftPointRef = useRef<SVGCircleElement | null>(null);
	const botRightPointRef = useRef<SVGCircleElement | null>(null);

	const currPos = props.block.position;
	const mainSvgRef = props.mainSvgRef;
	const slide = props.slide;
	const elemId = props.block.id;
	const [pos, setPos] = useState(currPos);
	const [size, setSize] = useState({width: props.block.width, height: props.block.height});

	useDragAndDropElement({elemRef, setPos, currPos, mainSvgRef, slide, elemId});
	useResizeElement({
		elemId, topLeftPointRef, topRightPointRef, botLeftPointRef, botRightPointRef,
		setPos, setSize, slide, mainSvgRef
	});

	// обновление координат после DnD и Resize
	props.block.position = pos;
	props.block.width = size.width;
	props.block.height = size.height;

	let svgElem: JSX.Element = <rect/>;
	let selectionBorder = <></>;
	if (props.selectedElements?.includes(props.block.id)) {
		selectionBorder = <SelectionBorder
			elemId={props.block.id}
			elemType={props.block.type}
			elemPos={props.block.position}
			elemWidth={props.block.width}
			elemHeight={props.block.height}
			topLeftPointRef={topLeftPointRef}
			topRightPointRef={topRightPointRef}
			botLeftPointRef={botLeftPointRef}
			botRightPointRef={botRightPointRef}
			// elemRef={elemRef}
		/>;
	}
	if (props.block.type === 'text') {
		svgElem = <TextBlock
			textElem={props.block}
			isSmallElem={false}
			elem_ref={elemRef}
			selectionBorder={selectionBorder}
		/>;
	}
	if (props.block.type === 'image') {
		svgElem = <ImageBlock
			imageElem={props.block}
			isSmallElem={false}
			elem_ref={elemRef}
			selectionBorder={selectionBorder}
		/>;
	}
	if (props.block.type === 'graphic') {
		svgElem = <GraphBlock
			graphElem={props.block}
			isSmallElem={false}
			elem_ref={elemRef}
			selectionBorder={selectionBorder}
		/>;
	}
	return svgElem;
}