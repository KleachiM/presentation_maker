import {Presentation} from "../../models/types";
import React from 'react';
import {Slides} from "../slides/Slides";
import "./Miniatures.css"

type ProgramProps = {
    presentation: Presentation
}

export function Miniatures(props: ProgramProps) {
    return <div className="miniatures">
        <Slides presentation={props.presentation}/>
    </div>
}
