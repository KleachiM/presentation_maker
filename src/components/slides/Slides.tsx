import {Presentation} from "../../models/types";
import {SlidesItem} from "./slide/SlidesItem";

type SlidesProps = {
    presentation: Presentation
}

const SlideStyle = {
    border: 'dashed green',
    width: '25%',
    marginBottom: '30px'
}

function Slides(props: SlidesProps) {
    return <>
        {props.presentation.data.map(slide => {
            return <div style={SlideStyle} key={slide.id}>
                <SlidesItem slides_item={slide}/>
            </div>
        })}
    </>
}

export {Slides}