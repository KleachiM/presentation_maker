import {Slide} from '../../../../models/types';
import {getSlideSvgElements} from '../../../viewFunctions';
import React from 'react';

type SlideProps = {
    slides_item: Slide,
	slidePos: number,
}

export function SlidesItem(props: SlideProps) {
	const slideSvgElements = getSlideSvgElements({slide: props.slides_item, isBigSlide: false, slidePos: props.slidePos});
	return <div>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0">
			{slideSvgElements}
		</svg>
	</div>;
}
