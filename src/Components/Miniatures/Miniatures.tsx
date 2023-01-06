import {Presentation} from "../../models/types";
import React from 'react';
import {MiniSlides} from "./minislides/MiniSlides";
import "./Miniatures.css"
import {connect} from "react-redux";

type ProgramProps = {
    presentation: Presentation
}

export function Miniatures(props: ProgramProps) {
    return <div className="miniatures">
        <MiniSlides presentation={props.presentation}/>
    </div>
}

const mapStateToProps = (state: Presentation) => ({
    presentation: state
})

export default connect(mapStateToProps)(Miniatures)