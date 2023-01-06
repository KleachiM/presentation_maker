import {Presentation, Slide} from "../../../Models/types";
import {SlidesItem} from "./Slide/SlidesItem";
import "./Slide.css";
import {setActiveSlide} from "../../../Actions/Actions";
import {connect} from "react-redux";
import {store} from "../../../index";

type SlidesProps = {
    slides: Array<Slide>,
    activeSlideId: string
}

export function MiniSlides(props: SlidesProps) {
    return <>
        {props.slides.map(slide => {
            return <div key={slide.id}
                        className={slide.id === props.activeSlideId ? "slide active_mini_slide" : "slide"}
                        onMouseDown={() => store.dispatch(setActiveSlide(slide.id))}>
                <SlidesItem slides_item={slide}/>
            </div>
        })}
    </>
}

const mapDispathToProps = {setActiveSlide}

const mapStateToProps = (state: Presentation) => ({
    slides: state.data,
    activeSlideId: state.active_slide
})

export default connect(mapStateToProps, mapDispathToProps)(MiniSlides)