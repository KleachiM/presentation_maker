import {store} from '../store';
import {presentationActions} from '../store/presentation';
import {useEffect} from 'react';

export function useDocumentKeyHandler() {
	useEffect(() => {
		const onKeyDownHandler = (event: KeyboardEvent) => {
			if (event.key === 'Delete')  {
				store.dispatch(presentationActions.deleteSelectedElements());
			}
			if (store.getState().presentation.selected_elements.length) return;

			if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
				store.dispatch(presentationActions.setActiveSlideUp());
			}
			if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
				store.dispatch(presentationActions.setActiveSlideDown());
			}
		};
		document.addEventListener('keydown', onKeyDownHandler);
		return () => document.removeEventListener('keydown', onKeyDownHandler);
	}, [store.getState().presentation.display_mode]);
}

export function useExitFullScreenHandler () {
	useEffect(() => {
		const onFullScreenHandl = (event: Event) => {
			if (!document.fullscreenElement) {
				store.dispatch(presentationActions.setDisplayMode('presentation'));
			}
		};
		document.addEventListener('fullscreenchange', onFullScreenHandl);
		return () => document.removeEventListener('fullscreenchange', onFullScreenHandl);
	});
}