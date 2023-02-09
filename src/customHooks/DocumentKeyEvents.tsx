import {store} from '../store';
import {presentationActions} from '../store/presentation';
import {useEffect, useReducer, useState} from 'react';

export function useDocumentKeyHandler() {
	useEffect(() => {
		const onKeyDownHandler = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
				store.dispatch(presentationActions.setActiveSlideUp());
			}
			if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
				store.dispatch(presentationActions.setActiveSlideDown());
			}
			if (event.key === 'Delete') {
				store.dispatch(presentationActions.deleteSelectedElements());
			}
		};
		document.addEventListener('keydown', onKeyDownHandler);
		return () => document.removeEventListener('keydown', onKeyDownHandler);
	}, [store.getState().presentation.display_mode]);

}