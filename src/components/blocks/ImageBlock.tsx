import React from "react";
import {Image} from "../../models/types";
import {getScaleValue} from "../viewFunctions";

type ImageBlockProps = {
    imageBlock: Image,
    isSmallElem: boolean
}

export function ImageBlock(props: ImageBlockProps) {
    const scale = getScaleValue(props.isSmallElem);
    return <>
        <image
            href={props.imageBlock.source}
            x={props.imageBlock.top_left_position.x / scale}
            y={props.imageBlock.top_left_position.y / scale}
            width={(props.imageBlock.bottom_right_position.x - props.imageBlock.top_left_position.x) / scale}
            height={(props.imageBlock.bottom_right_position.y - props.imageBlock.top_left_position.x) / scale}
        />
    </>
}