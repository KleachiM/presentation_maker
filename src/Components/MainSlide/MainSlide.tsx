import {Presentation, Slide} from "../../models/types";
import "./MainSlide.css"
import {getSlideSvgElements} from "../viewFunctions";

type MainSlideProps = {
    presentation: Presentation
}

export function MainSlide(props: MainSlideProps) {
    const index = props.presentation.data.map(e => e.id).indexOf(props.presentation.active_slide);
    const activeSlide: Slide = props.presentation.data[index];

    const slideSvgElements = getSlideSvgElements({slide: activeSlide, isBigSlide: true});
    return <div className="mainSlide">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%">
            {slideSvgElements}
        </svg>
    </div>
}