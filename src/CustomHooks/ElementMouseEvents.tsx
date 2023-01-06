import {Dispatch, RefObject, SetStateAction, useEffect} from "react";
import {Point, Slide} from "../Models/types";
import {setElemPosition} from "../Actions/Actions";
import {store} from "../index";

type DNDElemProps = {
    elemRef: RefObject<SVGElement | null>,
    setPos: Dispatch<SetStateAction<Point>>,
    curr_pos: Point,
    mainSvgRef: RefObject<SVGSVGElement> | undefined,
    slide: Slide,
    elemId: string
}
export function useDragAndDropElement(props: DNDElemProps) {
    const mainSvgPosition = props.mainSvgRef?.current?.getBoundingClientRect()
    const slide = props.slide
    const elemId = props.elemId
    let startPos = {x: 0, y: 0}
    let newPos = {x: 0, y: 0}
    useEffect(() => {
        props.elemRef.current?.addEventListener('mousedown', mouseDownHandl)
        return () => props.elemRef.current?.removeEventListener('mousedown', mouseDownHandl)
    })

    const mouseDownHandl = (event: MouseEvent) => {
        startPos = {
            x: event.pageX,
            y: event.pageY
        }

        document.addEventListener('mousemove', mouseMoveHandl)
        document.addEventListener('mouseup', mouseUpHandl)

        event.preventDefault()
    }

    const mouseMoveHandl = (event: MouseEvent) => {
        const delta = {
            x: event.pageX - startPos.x,
            y: event.pageY - startPos.y
        }
        // console.log(`elem pos x: ${props.curr_pos.x} mouse x: ${event.pageX}`)
        newPos = {
            x: props.curr_pos.x + delta.x,
            y: props.curr_pos.y + delta.y
        }

        props.setPos(newPos)
    }

    const  mouseUpHandl = () => {
        // setElemPosition(slide, elemId, newPos)
        store.dispatch(setElemPosition(slide, elemId, newPos))
        document.removeEventListener('mouseup', mouseUpHandl)
        document.removeEventListener('mousemove', mouseMoveHandl)
    }
}