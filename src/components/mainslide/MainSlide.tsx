import {Presentation} from "../../models/types";
import "./MainSlide.css"

type MainSlideProps = {
    presentation: Presentation
}

export function MainSlide(props: MainSlideProps) {
    const index = props.presentation.data.map(e => e.id).indexOf(props.presentation.selected_slide);
    const activeSlide = props.presentation.data[index];

    return <div className="mainSlide">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="blue"/>
            <text x="100" y="100">some text</text>
            <image href="https://www.coweb.ru/upload/coweb.png" x="150" y="100" width="300" height="300"/>
        </svg>
    </div>
}