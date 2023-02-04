import {store} from '../store';
import {presentationActions} from '../store/presentation';

export function useDocumentKeyHandler() {
	document.addEventListener('keydown', (event) => {
		console.log(`pressed: ${event.key}`);
		switch (event.key) {
		case 'Escape':

		}
	});
}