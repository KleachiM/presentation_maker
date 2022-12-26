import React from "react";
import {Text} from "../../models/types";
import {getScaleValue} from "../viewFunctions";

type TextBlockProps = {
    textBlock: Text,
    isSmallElem: boolean,
}

export function TextBlock(props: TextBlockProps) {
    const scale = getScaleValue(props.isSmallElem);
    return <>
        <text
            x={props.textBlock.top_left_position.x / scale}
            y={props.textBlock.top_left_position.y / scale}
            fontSize={props.textBlock.font_size / scale}
            fontFamily={props.textBlock.font_family}
            fill={props.textBlock.font_color}
            fontWeight={props.textBlock.font_weight / scale}
            fontStyle={props.textBlock.font_style}
            rotate={props.textBlock.rotation}
        >{props.textBlock.text_v}</text>
    </>
}