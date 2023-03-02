import { Component, Context, createContext, createSignal, ParentComponent, useContext } from "solid-js";
import {createStore} from "solid-js/store"
import {EditorConfig} from "../EditorConfig";
import {WindowConfig} from "../windows/WindowConfig";

interface EditorCtxProps {
    editorConfig?: EditorConfig
}

interface EditorCtxState {
    config: EditorConfig;
    setQueriesWindowConfig(windowConfig: WindowConfig): void;
}

const EditorCtx = createContext<EditorCtxState>({} as EditorCtxState)

export const EditorCtxProvider: ParentComponent<EditorCtxProps> = props => {
    const [config, setConfig] = createStore<EditorConfig>(props.editorConfig || new EditorConfig());
    const contextState = {
        config,
        setQueriesWindowConfig(windowConfig: WindowConfig) {
            setConfig({queriesWindow: windowConfig})
        }
    }

    return <EditorCtx.Provider value={contextState}>
        {props.children}
    </EditorCtx.Provider>
}

export const useEditorCtx = () => useContext<EditorCtxState>(EditorCtx);
