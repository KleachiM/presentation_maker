import React, {useRef} from "react";
import {GraphElem, ImageElem, TextElem} from "../../Models/types";
import {TextBlock} from "./TextBlock";
import {ImageBlock} from "./ImageBlock";
import {GraphBlock} from "./GraphBlock";

type SlideBlockProps = {
    block: TextElem | ImageElem | GraphElem
}

export function MiniSlideBlock(props: SlideBlockProps) {
    const ref = useRef<SVGTextElement & SVGImageElement & SVGCircleElement & SVGRectElement & SVGPolygonElement>(null)
    let svgElem: JSX.Element = <rect/>;
    if (props.block.type === 'text') {
        svgElem = <TextBlock textElem={props.block} isSmallElem={true} elem_ref={ref}/>
    }
    if (props.block.type === 'image') {
        svgElem = <ImageBlock imageElem={props.block} isSmallElem={true} elem_ref={ref}/>
    }
    if (props.block.type === 'graphic') {
        svgElem = <GraphBlock graphElem={props.block} isSmallElem={true} elem_ref={ref}/>
    }
    return svgElem;
}