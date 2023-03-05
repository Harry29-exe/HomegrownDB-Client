import {Component, createSignal, Show} from "solid-js";
import {Editor} from "./text-editor/Editor";
import {QueriesTree} from "./queries/QueriesTree";
import {EditorCtxProvider, useEditorContext} from "./EditorContext";
import {WindowPosition, WindowWrapper} from "./windows/WindowWrapper";
import {QueriesContext, useQueriesContext} from "./queries/QueriesContext";
import {QueriesManagerImpl} from "./queries/QueriesManager";

export const EditorWindow: Component = () => {
    const [loaded, setLoaded] = createSignal<boolean>(false);
    const queriesManager = new QueriesManagerImpl();
    queriesManager.load().then(result => {
        if (result instanceof Error) {
            throw result;
        }
        setLoaded(true);
    })

    return <Show when={loaded()} fallback={<div>Loading...</div>} keyed={false}>
            <QueriesContext queriesManager={queriesManager}>
                <EditorCtxProvider>
                    <EditorView/>
                </EditorCtxProvider>
            </QueriesContext>
        </Show>
}

const EditorView: Component = () => {
    const editorConfig = useEditorContext();
    const queriesContext = useQueriesContext();

    return <div class="w-full h-full relative flex flex-row">
        <WindowWrapper position={WindowPosition.LEFT} config={editorConfig.queriesWindowConfig}
                       updateConfig={config => editorConfig.queriesWindowConfig = config}>
            <QueriesTree queries={queriesContext.queries} onQuerySelect={query => queriesContext.setCurrentQuery(query)}/>
        </WindowWrapper>

        <div class={`absolute`} style={
            `left: ${editorConfig.textEditorLeftOffset}px;
             width: ${editorConfig.textEditorWith}px;`}>
            <Editor currentQuery={queriesContext.currentQuery}/>
        </div>

        <WindowWrapper position={WindowPosition.RIGHT} config={editorConfig.schemaWindowConfig}
                       updateConfig={config => editorConfig.schemaWindowConfig = config}>

        </WindowWrapper>
    </div>
}

