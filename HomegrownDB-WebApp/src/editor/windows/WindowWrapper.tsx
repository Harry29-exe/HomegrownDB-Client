import { Component, ParentComponent, Switch } from "solid-js";
import {WindowConfig} from "./WindowConfig";

export enum WindowPosition {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}

interface WindowWrapperProps {
    config: WindowConfig;
    updateConfig: (newConfig: WindowConfig) => any;
    position: WindowPosition
}

export const WindowWrapper: ParentComponent<WindowWrapperProps> = props => {
    console.log(props.config)
    return <>
        <div class="relative"
             style={`${props.config.widthStyle}${props.config.heightStyle}`}>
            {props.children}

            <Divider position={props.position}/>
        </div>
    </>
}

const Divider: Component<{position: WindowPosition}> = props => {
    const isVertical = () => props.position === WindowPosition.RIGHT ||
        props.position === WindowPosition.LEFT

    const dividerStyle = () => {
        switch (props.position) {
            case WindowPosition.TOP:
                return "bottom-0 left-0 h-1";
            case WindowPosition.BOTTOM:
                return "top-0 left-0 h-1";
            case WindowPosition.LEFT:
                return "right-0 top-0 w-1";
            case WindowPosition.RIGHT:
                return "left-0 top-0 w-1";
        }
    }

    return <div class={`absolute bg-slate-900 
        ${isVertical() ? 'h-full hover:scale-x-[4.0] hover:cursor-col-resize':
                        'w-full hover:scale-y-[4.0] hover:cursor-row-resize'}
        ${dividerStyle()}
    `}
    ></div>
}