import {Presentation, Slide} from '../../../models/types';
import {SlidesItem} from './Slide/SlidesItem';
import './Slide.css';
import {connect} from 'react-redux';
import React from 'react';
import {AppState, store} from '../../../store';
import {presentationActions} from '../../../store/presentation';

type SlidesProps = {
    slides: Array<Slide>,
    activeSlideId: string
}

export function MiniSlides(props: SlidesProps) {
	return <>
		{props.slides.map((slide, index) => {
			return <div key={slide.id}
				className={slide.id === props.activeSlideId ? 'slide active_mini_slide' : 'slide'}
				onMouseDown={() => {
					store.dispatch(presentationActions.setActiveSlide(slide.id));
					store.dispatch(presentationActions.setActiveSlideIndex(index));
				}}>
				<SlidesItem slides_item={slide} slidePos={index} />
			</div>;
		})}
	</>;
}

const mapDispathToProps = {setActiveSlide: presentationActions.setActiveSlide};

const mapStateToProps = (state: AppState) => {
	console.log(state);
	return {
		slides: state.presentation.data,
		activeSlideId: state.presentation.active_slide
	};
};

export default connect(mapStateToProps, mapDispathToProps)(MiniSlides);