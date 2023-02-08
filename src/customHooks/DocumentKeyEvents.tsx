import {store} from '../store';
import {presentationActions} from '../store/presentation';
import {useEffect, useReducer, useState} from 'react';

export function useDocumentKeyHandler() {
	useEffect(() => {
		const onFullScreenKeyEventsHandler = (event: KeyboardEvent) => {
			const slidesCount = store.getState().presentation.data.length;
			const activeSlideIndex = store.getState().presentation.active_slide_index;

			if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
				console.log(`'act sl index: ${activeSlideIndex} cnt: ${slidesCount}`);
				if (activeSlideIndex > 0)
					store.dispatch(presentationActions.setActiveSlideIndex(activeSlideIndex - 1));
			}
			if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
				console.log(`'act sl index: ${activeSlideIndex} cnt: ${slidesCount}`);
				if (activeSlideIndex < slidesCount - 1)
					store.dispatch(presentationActions.setActiveSlideIndex(activeSlideIndex + 1));
			}
		};
		const onDeleteKeyEventsHandler = (event: KeyboardEvent) => {
			if (event.key === 'Delete') {
				store.dispatch(presentationActions.deleteSelectedElements());
			}
		};
		document.addEventListener('keydown', onDeleteKeyEventsHandler);
		const onFullScreenChange = () => {
			if (document.fullscreen) {
				store.dispatch(presentationActions.setDisplayMode('preview'));
				document.addEventListener('keydown', onFullScreenKeyEventsHandler);
			} else {
				store.dispatch(presentationActions.setDisplayMode('presentation'));
				document.removeEventListener('keydown', onFullScreenKeyEventsHandler);
			}
		};
		document.addEventListener('fullscreenchange', onFullScreenChange);

		return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
	}, [store.getState().presentation.display_mode]);

	if (store.getState().presentation.display_mode === 'preview') {
		document.addEventListener('keydown', (event) => {
			console.log(`pressed: ${event.key}`);
		});
	}

}