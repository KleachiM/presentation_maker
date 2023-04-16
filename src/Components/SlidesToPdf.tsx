import React, {useRef} from 'react';
import {AppState} from '../store';
import {connect} from 'react-redux';
import {Slide} from '../models/types';
import {SlidesItem} from './Miniatures/Minislides/Slide/SlidesItem';
import Pdf from 'react-to-pdf';

type SlidesToPdfProps = {
    slides: Array<Slide>
}
export function SlidesToPdf(props: SlidesToPdfProps) {
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };
    console.log('asdfasfd');
    const slidesToPdfRef = useRef<HTMLDivElement>(null);
    return <div>
        <Pdf
            targetRef={slidesToPdfRef}
            filename="div-blue.pdf"
        />
        <div ref={slidesToPdfRef}>
            {props.slides.map((slide, index) => {
                return <div key={slide.id}
                            style={{backgroundColor: slide.background}}
                            className={'slide'}>
                    <SlidesItem slides_item={slide} slidePos={index}/>
                </div>;
            })}
        </div>
    </div>;
}

function mapStateToProps(state: AppState) {
    return {
        slides: state.presentation.data,
    };
}

export default connect(mapStateToProps)(SlidesToPdf);