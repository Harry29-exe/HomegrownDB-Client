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
    const resize = (deltaX: number, deltaY: number) => {
        const config = props.config.clone();
        if (props.position == WindowPosition.LEFT || props.position == WindowPosition.RIGHT) {
            config.width += deltaX;
        } else {
            config.height += deltaY;
        }
        props.updateConfig(config);
    }

    const style = () => {
        switch (props.position) {
            case WindowPosition.LEFT:
                return 'left-0';
            case WindowPosition.RIGHT:
                return 'right-0';
            case WindowPosition.TOP:
                return 'top-0';
            case WindowPosition.BOTTOM:
                return 'bottom';
        }
    }

    return <>
        <div class={`absolute ${style()}`}
             style={`${props.config.widthStyle}${props.config.heightStyle}`}>
            {props.children}

            <Divider position={props.position} onResize={resize}/>
        </div>
    </>
}

interface DividerProps {
    position: WindowPosition;
    onResize: (deltaX: number, deltaY: number) => any;
}

const Divider: Component<DividerProps> = props => {
    const isVertical = () => props.position === WindowPosition.RIGHT ||
        props.position === WindowPosition.LEFT

    const dividerStyle = () => {
        switch (props.position) {
            case WindowPosition.TOP:
                return "bottom-[-4px] left-0 h-3";
            case WindowPosition.BOTTOM:
                return "top-[-4px] left-0 h-3";
            case WindowPosition.LEFT:
                return "right-[-4px] top-0 w-3";
            case WindowPosition.RIGHT:
                return "left-[-4px] top-0 w-3";
        }
    }

    const mouseDown = (mouseEvent: MouseEvent) => {
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;
        const mouseMove = (mouseEvent: MouseEvent) => {
            props.onResize(props.position === WindowPosition.LEFT?
                mouseEvent.clientX - x: x - mouseEvent.clientX,
                props.position === WindowPosition.TOP?
                mouseEvent.clientY - y : y - mouseEvent.clientY
            )
            x = mouseEvent.clientX;
            y = mouseEvent.clientY;
        };
        const mouseUp = (mouseEvent: MouseEvent) => {
            window.removeEventListener('mousemove',mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp)
    }

    return <div class={`absolute
        ${isVertical() ? 'h-full hover:scale-x-[1.8] hover:cursor-col-resize px-1':
                        'w-full hover:scale-y-[1.8] hover:cursor-row-resize py-1'}
        ${dividerStyle()}
    `} onmousedown={mouseDown}
    >
        <div class="h-full w-full bg-slate-900 relative"
        />
    </div>
}