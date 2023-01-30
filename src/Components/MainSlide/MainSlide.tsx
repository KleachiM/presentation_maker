import {Presentation, Slide} from '../../Models/types';
import './MainSlide.css';
import {getSlideSvgElements} from '../viewFunctions';
import {connect} from 'react-redux';
import {useRef} from 'react';
import React from 'react';

type MainSlideProps = {
    slides: Array<Slide>,
    activeSlide: string,
	selectedElements: Array<string>
}

export function MainSlide(props: MainSlideProps) {
	const index = props.slides.map(e => e.id).indexOf(props.activeSlide);
	const mainSlide = props.slides[index];
	const mainSlideSvgRef = useRef<SVGSVGElement>(null);
	const slideSvgElements = getSlideSvgElements({
		slide: mainSlide,
		isBigSlide: true,
		mainSvgRef: mainSlideSvgRef,
		selectedElements: props.selectedElements
	});
	return <div className="mainSlide">
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
			x="0" y="0" width="100%" height="100%"
			ref={mainSlideSvgRef}
		>
			{slideSvgElements}
		</svg>
	</div>;
}

function mapStateToProps(state: Presentation) {
	return {
		slides: state.data,
		activeSlide: state.active_slide,
		selectedElements: state.selected_elements
	};
}
export default connect(mapStateToProps)(MainSlide);