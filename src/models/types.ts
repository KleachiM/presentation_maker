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
    data: Array<Slide>
}

export type History = Array<Presentation>

export type ActionType = any

export enum StateTypes {
    SET_ACTIVE_SLIDE,
    SET_ELEM_CHECKED,
    SET_ELEM_NEW_POS,
    SET_ELEM_NEW_SIZE,
    CHANGE_TITLE
}
