import { createContext, createSignal, ParentComponent, useContext } from "solid-js";
import {WindowConfig, WindowConsts} from "../components/windows/WindowConfig";

const EditorContext = createContext<EditorState>({} as EditorState)

export const useEditorStateContext = () => useContext<EditorState>(EditorContext);

interface EditorStateContextProviderProps {
    queriesWindow?: WindowConfig,
    schemaWindow?: WindowConfig
}

export const EditorStateContextProvider: ParentComponent<EditorStateContextProviderProps> = props => {
    return <EditorContext.Provider value={new EditorContextImpl(props.queriesWindow, props.schemaWindow)}>
        {props.children}
    </EditorContext.Provider>
}

interface EditorState {
    set queriesWindowConfig(windowConfig: WindowConfig);
    get queriesWindowConfig(): WindowConfig
    set schemaWindowConfig(windowConfig: WindowConfig);
    get schemaWindowConfig(): WindowConfig
    get textEditorLeftOffset(): number
    get textEditorWith(): number
}

class EditorContextImpl implements EditorState {
    private _queriesWindowConfig = createSignal<WindowConfig>(new WindowConfig(200, WindowConsts.FULL))
    private _schemaWindowConfig = createSignal<WindowConfig>(new WindowConfig(150, WindowConsts.FULL));

    constructor(
        queriesWindow?: WindowConfig,
        schemaWindow?: WindowConfig
    ) {
        if (queriesWindow) this.queriesWindowConfig = queriesWindow;
        if (schemaWindow) this.schemaWindowConfig = schemaWindow;
    }

    get textEditorLeftOffset(): number {
        return this.queriesWindowConfig.width;
    }

    get textEditorWith(): number {
        return window.innerWidth - this.queriesWindowConfig.width - this.schemaWindowConfig.width;
    }

    get queriesWindowConfig(): WindowConfig{
        return this._queriesWindowConfig[0]();
    }

    set queriesWindowConfig(value: WindowConfig) {
        this._queriesWindowConfig[1](value)
    }

    get schemaWindowConfig(): WindowConfig {
        return this._schemaWindowConfig[0]();
    }

    set schemaWindowConfig(value: WindowConfig) {
        this._schemaWindowConfig[1](value);
    }
}
