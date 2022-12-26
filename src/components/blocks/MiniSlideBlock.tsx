import React from "react";
import {GraphObject, Image, Text} from "../../models/types";
import {TextBlock} from "./TextBlock";
import {ImageBlock} from "./ImageBlock";
import {GraphBlock} from "./GraphBlock";

type SlideBlockProps = {
    block: Text | Image | GraphObject
}

export function MiniSlideBlock(props: SlideBlockProps) {
    let svgElem: JSX.Element = <rect/>;
    if (props.block.type === 'text') {
        svgElem = <TextBlock textBlock={props.block} isSmallElem={true}/>
    }
    if (props.block.type === 'image') {
        svgElem = <ImageBlock imageBlock={props.block} isSmallElem={true}/>
    }
    if (props.block.type === 'graphic') {
        svgElem = <GraphBlock graphBlock={props.block} isSmallElem={true}/>
    }
    return svgElem;
}