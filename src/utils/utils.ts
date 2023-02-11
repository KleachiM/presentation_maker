import {AppState} from '../store';
import {SlideElement} from '../models/types';

export function deepClone<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

export function getBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!file) reject('not found file');
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
}

export function walkOnSlideElements<T = SlideElement['type']>(state: AppState['presentation'], cb: (el: T, i: number, arr: SlideElement[]) => void, elType?: SlideElement['type']) {
	const currentSlide = state.data[state.active_slide_index];
	currentSlide.slide_data.forEach((el, i, arr) => {
		if (elType) {
			elType === el.type && cb(el as T, i, arr);
		} else {
			cb(el as T, i, arr);
		}
	});
}
/* eslint-disable */
export function debounce<T extends Function>(cb: T, wait = 20) {
	let h: NodeJS.Timeout;
	const callable = (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => cb(...args), wait);
	};
	return <T>(<any>callable);
}
