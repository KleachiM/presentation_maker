import {Point, SlideElement} from "./types";

export function addText(
    text_value: string,
    params: {
        position?: Point,
        width?: number,
        height?: number,
    } = {}
): SlideElement  {
    return {
        id: `${new Date().getTime()}${Math.random()}`,
        type: 'text',
        text_value: text_value,
        font_size: 18,
        font_color: 'black',
        font_family: 'Tahoma',
        font_weight: 5,
        font_style: 'bold',
        position: params.position || {x: 20, y: 20},
        width: params.width || 120,
        height: params.height || 120
    }
}