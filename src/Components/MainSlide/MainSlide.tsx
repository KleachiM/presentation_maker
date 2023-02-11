import {Slide} from '../../models/types';
import './MainSlide.css';
import {getSlideSvgElements} from '../viewFunctions';
import {connect} from 'react-redux';
import {useRef} from 'react';
import React from 'react';
import {AppState} from '../../store';
import {useMouseDownDocumentHandler} from '../../customHooks/DocumentMouseEvents';

type MainSlideProps = {
	slides: Array<Slide>,
	activeSlide: string,
	selectedElements: Array<string>,
	displayMode: string
}

export function MainSlide(props: MainSlideProps) {
	const index = props.slides.map(e => e.id).indexOf(props.activeSlide);
	const mainSlide = props.slides[index];
	const mainSlideSvgRef = useRef<SVGSVGElement>(null);
	const slideSvgElements = getSlideSvgElements({
		slide: mainSlide,
		isBigSlide: true,
		mainSvgRef: mainSlideSvgRef,
		selectedElements: props.selectedElements,
		slidePos: index,
		displayMode: props.displayMode
	});
	useMouseDownDocumentHandler({elem_ref: mainSlideSvgRef});
	return <div className="mainSlide">
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
			x="0" y="0" width="100%" height="100%"
			ref={mainSlideSvgRef}
			style={{backgroundColor:mainSlide.background}}
		>
			{slideSvgElements}
		</svg>
	</div>;
}

function mapStateToProps(state: AppState) {
	return {
		slides: state.presentation.data,
		activeSlide: state.presentation.active_slide,
		selectedElements: state.presentation.selected_elements,
		displayMode: state.presentation.display_mode
	};
}
export default connect(mapStateToProps)(MainSlide);