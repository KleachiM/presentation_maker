import {Point, SlideElement} from "./types";

export function addImage(
    source: string,
    params: {
        position?: Point,
        width?: number,
        height?: number,
    } = {}
): SlideElement  {
    return {
        id: `${new Date().getTime()}${Math.random()}`,
        type: 'image',
        source: source,
        source_type: 'ref',
        position: params.position || {x: 200, y: 200},
        width: params.width || 80,
        height: params.height || 100
    }
}