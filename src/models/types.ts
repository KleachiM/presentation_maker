import {TOOLS} from '../const/tools';

export type Point = {
    x: number,
    y: number
}

export type Block = {
    id: string,
    position: Point,
    width: number,
    height: number,
}

export type Text = {
    type: 'text',
    text_value: string,
    font_size: number,
    font_color: string,
    font_family: string,
    font_weight: number,
    font_style: string,
    text_decoration: string
}

export type Image = {
    type: 'image',
    source: string,
    source_type: string,
}

export type GraphObj = {
    type: 'graphic',
    color: string,
    gr_obj_type: 'triangle' | 'rectangle' | 'circle'
}

export type TextElem = Block & Text
export type ImageElem = Block & Image
export type GraphElem = Block & GraphObj
export type SlideElement = TextElem|ImageElem|GraphElem;

export type Slide = {
    id: string,
    background: string,
    transition_style: string,
    scale: number,
    slide_data: SlideElement[],
}

export type Presentation = {
    title: string,
    display_mode: string,
    active_slide: string,
    active_slide_index: number,
    selected_elements: Array<string>,
    data: Slide[],
    last_selected_text_id: string,
    currentTool: TOOLS | null;
}
