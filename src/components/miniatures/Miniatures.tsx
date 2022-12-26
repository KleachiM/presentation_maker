import {Presentation} from "../../models/types";
import React from 'react';
import {MiniSlides} from "./minislides/MiniSlides";
import "./Miniatures.css"

type ProgramProps = {
    presentation: Presentation
}

export function Miniatures(props: ProgramProps) {
    return <div className="miniatures">
        <MiniSlides presentation={props.presentation}/>
    </div>
}
