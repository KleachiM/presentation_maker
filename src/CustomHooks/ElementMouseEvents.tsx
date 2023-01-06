import {Dispatch, RefObject, SetStateAction, useEffect} from 'react';
import {Point} from '../Models/types';

type DNDElemProps = {
    ref: RefObject<SVGElement | null>,
    setPos: Dispatch<SetStateAction<Point>>,
    curr_pos: Point,
    mainSvgRef: RefObject<SVGSVGElement> | undefined
}
export function useDragAndDropElement(props: DNDElemProps) {
	const mainSvgPosition = props.mainSvgRef?.current?.getBoundingClientRect();
	let startPos = {x: 0, y: 0};
	let newPos = {x: 0, y: 0};
	useEffect(() => {
		props.ref.current?.addEventListener('mousedown', mouseDownHandl);
		return () => props.ref.current?.removeEventListener('mousedown', mouseDownHandl);
	});

	const mouseDownHandl = (event: MouseEvent) => {
		startPos = {
			x: event.pageX,
			y: event.pageY
		};

		document.addEventListener('mousemove', mouseMoveHandl);
		document.addEventListener('mouseup', mouseUpHandl);

		event.preventDefault();
	};

	const mouseMoveHandl = (event: MouseEvent) => {
		const delta = {
			x: event.pageX - startPos.x,
			y: event.pageY - startPos.y
		};
		console.log(`elem pos x: ${props.curr_pos.x} mouse x: ${event.pageX}`);
		newPos = {
			x: props.curr_pos.x + delta.x,
			y: props.curr_pos.y + delta.y
		};

		props.setPos(newPos);
	};

	const  mouseUpHandl = () => {
		console.log('mouse up!');
		document.removeEventListener('mousemove', mouseMoveHandl);
		document.removeEventListener('mouseup', mouseUpHandl);
	};
}