import {Dispatch, RefObject, SetStateAction, useEffect} from 'react';
import {Point, Slide} from '../models/types';
import {setElemPosition, setElemSize} from '../Actions/Actions';
import {store} from "../store";
import {presentationActions} from "../store/presentation";
import {log} from "util";

type DNDElemProps = {
    elemRef: RefObject<SVGElement | null>,
    setPos: Dispatch<SetStateAction<Point>>,
    currPos: Point,
    mainSvgRef: RefObject<SVGSVGElement> | undefined,
    slide: Slide,
    elemId: string
}
export function useDragAndDropElement(props: DNDElemProps) {
	const slide = props.slide;
	const elemId = props.elemId;
	let startPos = {x: 0, y: 0};
	let newPos = {x: 0, y: 0};
	let delta = {x: 0, y: 0};
	console.log(props)
	useEffect(() => {
		props.elemRef.current?.addEventListener('mousedown', mouseDownHandl);
		return () => props.elemRef.current?.removeEventListener('mousedown', mouseDownHandl);
	});

	const mouseDownHandl = (event: MouseEvent) => {
		startPos = {
			x: event.pageX,
			y: event.pageY
		};

		store.dispatch(presentationActions.setSelectedElements([elemId]));
		document.addEventListener('mousemove', mouseMoveHandl);
		document.addEventListener('mouseup', mouseUpHandl);

		event.preventDefault();
	};

	const mouseMoveHandl = (event: MouseEvent) => {
		delta = {
			x: event.pageX - startPos.x,
			y: event.pageY - startPos.y
		};
		newPos = {
			x: props.currPos.x + delta.x,
			y: props.currPos.y + delta.y
		};

		props.setPos(newPos);
	};

	const  mouseUpHandl = () => {
		if (delta.x || delta.y) {
			store.dispatch(setElemPosition(slide, elemId, newPos));
		}
		document.removeEventListener('mouseup', mouseUpHandl);
		document.removeEventListener('mousemove', mouseMoveHandl);
	};
}

type ResizeElemProps = {
	elemId: string,
	topLeftPointRef: RefObject<SVGCircleElement>,
	topRightPointRef: RefObject<SVGCircleElement>,
	botLeftPointRef: RefObject<SVGCircleElement>,
	botRightPointRef: RefObject<SVGCircleElement>,
	setPos: Dispatch<SetStateAction<Point>>,
	setSize: Dispatch<SetStateAction<{width: number, height: number}>>,
	slide: Slide,
	mainSvgRef: RefObject<SVGSVGElement> | undefined
}

export function useResizeElement(props: ResizeElemProps) {
	const mainSvgPosition = props.mainSvgRef?.current?.getBoundingClientRect();
	const mainSvgLeft = mainSvgPosition? mainSvgPosition.left : 0;
	const mainSvgTop = mainSvgPosition? mainSvgPosition.top : 0;

	const elemIndex = props.slide.slide_data.map(item => item.id).indexOf(props.elemId);
	const elem = props.slide.slide_data[elemIndex];

	let corner: PushedCorner;
	enum PushedCorner {
		TopLeft,
		TopRight,
		BotLeft,
		BotRight
	}

	let newPos = {
		x: 0,
		y: 0
	};

	let newWidth = 0;
	let newHeight = 0;

	useEffect(() => {
		props.topLeftPointRef.current?.addEventListener('mousedown', mouseDownTopLeft);
		props.topRightPointRef.current?.addEventListener('mousedown', mouseDownTopRight);
		props.botLeftPointRef.current?.addEventListener('mousedown', mouseDownBotLeft);
		props.botRightPointRef.current?.addEventListener('mousedown', mouseDownBotRight);
		return () => {
			document.removeEventListener('mousedown', mouseDownTopLeft);
			document.removeEventListener('mousedown', mouseDownTopRight);
			document.removeEventListener('mousedown', mouseDownBotLeft);
			document.removeEventListener('mousedown', mouseDownBotRight);
		};
	});

	const mouseDownTopLeft = (event: MouseEvent) => {
		corner = PushedCorner.TopLeft;
		commonMouseDownHandler(event);
	};

	const mouseDownTopRight = (event: MouseEvent) => {
		corner = PushedCorner.TopRight;
		commonMouseDownHandler(event);
	};

	const mouseDownBotLeft = (event: MouseEvent) => {
		corner = PushedCorner.BotLeft;
		commonMouseDownHandler(event);
	};

	const mouseDownBotRight = (event: MouseEvent) => {
		corner = PushedCorner.BotRight;
		commonMouseDownHandler(event);
	};

	const commonMouseDownHandler = (event: MouseEvent) => {
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
		event.preventDefault();
	};
	const mouseMoveHandler = (event: MouseEvent) => {

		if (corner === PushedCorner.TopLeft) {
			newPos = {
				x: event.pageX - mainSvgLeft,
				y: event.pageY - mainSvgTop
			};

			newWidth = elem.width + elem.position.x - newPos.x;
			newHeight = elem.height + elem.position.y - newPos.y;
		}

		if (corner === PushedCorner.TopRight) {
			newPos = {
				x: elem.position.x,
				y: event.pageY - mainSvgTop
			};

			newWidth = event.pageX - mainSvgLeft - elem.position.x;
			newHeight = elem.height + elem.position.y - newPos.y;
		}

		if (corner === PushedCorner.BotLeft) {
			newPos = {
				x: event.pageX - mainSvgLeft,
				y: elem.position.y
			};

			newWidth = elem.width + elem.position.x - newPos.x;
			newHeight = event.pageY - mainSvgTop - elem.position.y;
		}

		if (corner === PushedCorner.BotRight) {
			newPos = {
				x: elem.position.x,
				y: elem.position.y
			};

			newWidth = event.pageX - mainSvgLeft - elem.position.x;
			newHeight = event.pageY - mainSvgTop - elem.position.y;
		}

		if (newWidth > 10 && newHeight > 10) {
			props.setPos(newPos);
			props.setSize({width: newWidth, height: newHeight});
		}
	};

	const mouseUpHandler = () => {
		if (newPos.x !== 0 || newPos.y !== 0) {
			store.dispatch(setElemPosition(props.slide, props.elemId, newPos));
		}
		if (newWidth !== 0 && newHeight !== 0) {
			store.dispatch(setElemSize(props.slide, props.elemId, newWidth, newHeight));
		}
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
}