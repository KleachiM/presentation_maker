import {Presentation} from "../../../models/types";
import {SlidesItem} from "./slide/SlidesItem";
import "./Slide.css";
import {setActiveSlide} from "../../../actions/Actions";
import {connect} from "react-redux";
import {store} from "../../../index";

type SlidesProps = {
    presentation: Presentation,
}

export function MiniSlides(props: SlidesProps) {
    const activeSlideId = props.presentation.active_slide;
    return <>
        {props.presentation.data.map(slide => {
            return <div key={slide.id}
                        className={slide.id === activeSlideId ? "slide active_mini_slide" : "slide"}
                        onMouseDown={() => store.dispatch(setActiveSlide(slide.id))}>
                <SlidesItem slides_item={slide}/>
            </div>
        })}
    </>
}

const mapDispathToProps = {setActiveSlide}

const mapStateToProps = (state: Presentation) => ({
    presentation: state
})

export default connect(mapStateToProps, mapDispathToProps)(MiniSlides)