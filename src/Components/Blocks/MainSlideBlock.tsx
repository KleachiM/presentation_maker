import React, {RefObject, useRef, useState} from 'react';
import {TextBlock} from './TextBlock';
import {ImageBlock} from './ImageBlock';
import {GraphBlock} from './GraphBlock';
import {useDragAndDropElement, useResizeElement} from '../../customHooks/ElementMouseEvents';
import {GraphElem, ImageElem, Slide, TextElem} from '../../models/types';
import {SelectionBorder} from './SelectionBorder';
import {deepClone} from '../../utils/utils';
import {presentationActions} from '../../store/presentation';

type SlideBlockProps = {
	block: TextElem | ImageElem | GraphElem,
	mainSvgRef: RefObject<SVGSVGElement> | undefined,
	slide: Slide,
	selectedElements: Array<string> | undefined,
	slidePos: number,
	slideDataPos: number,
	displayMode: string | undefined
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
	const displayMode = props.displayMode;

	useDragAndDropElement({elemRef, setPos, currPos, mainSvgRef, slide, elemId, displayMode});
	useResizeElement({
		elemId, topLeftPointRef, topRightPointRef, botLeftPointRef, botRightPointRef,
		setPos, setSize, slide, mainSvgRef, displayMode
	});

	// обновление координат после DnD и Resize
	const newPos = {
		position: pos,
		...size
	};

	const newSlide = deepClone(props.slide);
	newSlide.slide_data[props.slideDataPos] = {
		...newSlide.slide_data[props.slideDataPos],
		...newPos
	};


	let svgElem: JSX.Element = <rect style={{backgroundColor: props.slide.background}}/>;
	let selectionBorder = <></>;
	if (props.selectedElements?.includes(props.block.id)) {
		selectionBorder = <SelectionBorder
			elemId={props.block.id}
			elemType={props.block.type}
			elemPos={newPos.position}
			elemWidth={newPos.width}
			elemHeight={newPos.height}
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