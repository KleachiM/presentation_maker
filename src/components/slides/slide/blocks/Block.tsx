import {GraphObject, Image, Text} from "../../../../models/types";

type BlockProps = {
    elem: Text | Image | GraphObject
}

function TextBlock(props: BlockProps) {
    return <div>
        'type: text'
        <br/>
        {
            'text_v' in props.elem ? props.elem.text_v : ''
        }
    </div>
}

function ImageBlock(props: BlockProps) {
    return <div>
        'type: image'
        <br/>
        <img src={
            'source' in props.elem ? props.elem.source : ''
        }
        alt='alt pic' />
    </div>
}

function GraphBlock(props: BlockProps) {
    if ('data' in props.elem)
    {
        if ('gr_obj_type' in props.elem.data)
        {
            const gr_type = props.elem.data.gr_obj_type;

            if (gr_type === 'circle')
            {
                return (
                    <svg width={'100%'} height={'100%'}>
                        <circle cx={props.elem.data.center_position.x}
                                cy={props.elem.data.center_position.y}
                                r={props.elem.data.radius}
                                fill={props.elem.color}
                        />
                    </svg>
                )
            }

            if (gr_type === 'rectangle')
            {
                return (
                    <svg width={'100%'} height={'100%'}>
                        <rect x={props.elem.data.top_left_position.x}
                              y={props.elem.data.top_left_position.y}
                              width={props.elem.data.rect_width}
                              height={props.elem.data.rect_height}
                              fill={props.elem.color}
                        />
                    </svg>
                )
            }

            if (gr_type === 'triangle')
            {
                return (
                    <svg width={'100%'} height={'100%'}>
                        <polygon
                            points={
                                props.elem.data.first_point_position.x + ', ' + props.elem.data.first_point_position.y + ' ' +
                                props.elem.data.second_point_position.x + ', ' + props.elem.data.second_point_position.y + ' ' +
                                props.elem.data.third_point_position.x + ', ' + props.elem.data.third_point_position.y
                            }
                            fill={props.elem.color}
                        />
                    </svg>
                )
            }
        }
    }

    return <div>No grahp element</div>
}

function Block(props: BlockProps) {
    const blockType = props.elem.type;
    if (blockType === 'text')
    {
        return <TextBlock elem={props.elem}/>
    }
    if (blockType === 'image')
    {
        return <ImageBlock elem={props.elem}/>
    }
    if (blockType === 'graphic')
    {
        return <GraphBlock elem={props.elem}/>
    }
    return null
}

export {Block}