import {Point, SlideElement} from "./types";

export function createRectangle(
    color: string,
    params: {
        position?: Point,
        width?: number,
        height?: number,
    } = {}
): SlideElement  {
    return {
        id: `${new Date().getTime()}${Math.random()}`,
        type: 'graphic',
        color: color,
        gr_obj_type: 'rectangle',
        position: params.position || {x: 20, y: 20},
        width: params.width || 80,
        height: params.height || 100
    }
}

export function createTriangle(
    color: string,
    params: {
        position?: Point,
        width?: number,
        height?: number,
    } = {}
): SlideElement  {
    return {
        id: `${new Date().getTime()}${Math.random()}`,
        type: 'graphic',
        color: color,
        gr_obj_type: 'triangle',
        position: params.position || {x: 20, y: 20},
        width: params.width || 120,
        height: params.height || 120
    }
}

export function createCircle(
    color: string,
    params: {
        position?: Point,
        width?: number,
        height?: number,
    } = {}
): SlideElement  {
    return {
        id: `${new Date().getTime()}${Math.random()}`,
        type: 'graphic',
        color: color,
        gr_obj_type: 'circle',
        position: params.position || {x: 20, y: 20},
        width: params.width || 120,
        height: params.height || 120
    }
}