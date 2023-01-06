import React from "react";
import {GraphObject} from "../../models/types";
import {getScaleValue} from "../viewFunctions";

type GraphBlockProps = {
    graphBlock: GraphObject,
    isSmallElem: boolean
}

export function GraphBlock(props: GraphBlockProps) {
    const scale = getScaleValue(props.isSmallElem);
    const gr_obj_type = props.graphBlock.data.gr_obj_type;
    let svgElem = <rect/>
    if (gr_obj_type === "triangle") {
        svgElem = <polygon
            points={
                props.graphBlock.data.first_point_position.x / scale + " " +
                props.graphBlock.data.first_point_position.y / scale + ", " +
                props.graphBlock.data.second_point_position.x / scale + " " +
                props.graphBlock.data.second_point_position.y / scale + ", " +
                props.graphBlock.data.third_point_position.x / scale + " " +
                props.graphBlock.data.third_point_position.y / scale
            }
            fill={props.graphBlock.color}
        />
    }
    if (gr_obj_type === "rectangle") {
        svgElem = <rect
            x={props.graphBlock.data.top_left_position.x / scale}
            y={props.graphBlock.data.top_left_position.y / scale}
            width={(props.graphBlock.data.bottom_right_position.x - props.graphBlock.data.top_left_position.x) / scale}
            height={(props.graphBlock.data.bottom_right_position.y - props.graphBlock.data.top_left_position.y) / scale}
            fill={props.graphBlock.color}
        />
    }
    if (gr_obj_type === "circle") {
        svgElem = <><circle
            cx={props.graphBlock.data.center_position.x / scale}
            cy={props.graphBlock.data.center_position.y / scale}
            r={props.graphBlock.data.radius / scale}
            fill={props.graphBlock.color}
        /></>
    }
    return svgElem;
}