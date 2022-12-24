import {Presentation} from "../../models/types";
import {SlidesItem} from "./slide/SlidesItem";
import "./Slide.css"

type SlidesProps = {
    presentation: Presentation
}

function Slides(props: SlidesProps) {
    return <>
        {props.presentation.data.map(slide => {
            return <div className="slide" key={slide.id}>
                <SlidesItem slides_item={slide}/>
            </div>
        })}
    </>
}

export {Slides}