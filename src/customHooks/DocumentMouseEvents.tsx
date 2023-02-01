import {useEffect} from 'react';
import {store} from "../store";
import {presentationActions} from "../store/presentation";

export function useMouseDownDocumentHandler() {
	useEffect(() => {
		document.addEventListener('mousedown', mouseDownHandler);
		return () => {
			document.removeEventListener('mousedown', mouseDownHandler);
		};
	});

	const mouseDownHandler = (event: MouseEvent) => {
		if (!event.defaultPrevented) {
			store.dispatch(presentationActions.setSelectedElements([]));
		}
	};
}