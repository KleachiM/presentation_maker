import {Presentation} from "../../../models/types";
import {SlidesItem} from "./slide/SlidesItem";
import "./Slide.css";

type SlidesProps = {
    presentation: Presentation
}

export function MiniSlides(props: SlidesProps) {
    const activeSlideId = props.presentation.active_slide;
    return <>
        {props.presentation.data.map(slide => {
            return <div key={slide.id}
                        className={slide.id === activeSlideId ? "slide active_mini_slide" : "slide"}>
                <SlidesItem slides_item={slide}/>
            </div>
        })}
    </>
}
