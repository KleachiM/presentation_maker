import {useEffect} from 'react';
import {store} from '../index';
import {setElemChecked} from '../Actions/Actions';

export function useMouseDownDocumentHandler() {
	useEffect(() => {
		document.addEventListener('mousedown', mouseDownHandler);
		return () => {
			document.removeEventListener('mousedown', mouseDownHandler);
		};
	});

	const mouseDownHandler = (event: MouseEvent) => {
		if (!event.defaultPrevented) {
			store.dispatch(setElemChecked([]));
		}
	};
}