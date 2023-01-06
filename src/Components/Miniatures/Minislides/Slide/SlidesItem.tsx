import {Slide} from '../../../../Models/types';
import {getSlideSvgElements} from '../../../viewFunctions';

type SlideProps = {
    slides_item: Slide
}

export function SlidesItem(props: SlideProps) {
	const slideSvgElements = getSlideSvgElements({slide: props.slides_item, isBigSlide: false});
	return <div>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%">
			{slideSvgElements}
		</svg>
	</div>;
}
