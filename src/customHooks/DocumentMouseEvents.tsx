import {RefObject, useEffect} from 'react';
import {store} from '../store';
import {presentationActions} from '../store/presentation';

type mouseDownDocPayload = {
	elem_ref?: RefObject<SVGSVGElement>
}
export function useMouseDownDocumentHandler(payload: mouseDownDocPayload) {
	useEffect(() => {
		payload.elem_ref?.current?.addEventListener('mousedown', mouseDownHandler);
		return () => {
			payload.elem_ref?.current?.removeEventListener('mousedown', mouseDownHandler);
		};
	});

	const mouseDownHandler = (event: MouseEvent) => {
		if (!event.defaultPrevented ) {
			store.dispatch(presentationActions.setSelectedElements([]));
		}
	};
}