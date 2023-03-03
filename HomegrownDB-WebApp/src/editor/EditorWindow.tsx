import {Component, createSignal, onMount} from "solid-js";
import {Editor} from "./text-editor/Editor";
import {QueriesTree} from "./queries/QueriesTree";
import {QueriesApi, QueryDTO} from "../client/QueriesApi";
import {EditorCtxProvider, useEditorContext} from "./EditorContext";
import {WindowPosition, WindowWrapper} from "./windows/WindowWrapper";

export const EditorWindow: Component = () => {
    const [currentQuery, setCurrentQuery] = createSignal(new QueryDTO("", ""));
    const [isLoading, setLoading] = createSignal<boolean>(false);
    const [queries, setQueries] = createSignal<QueryDTO[]>([])

    const queriesApi = new QueriesApi()
    onMount(async () => {
        const queries = await queriesApi.getAllQueries();
        setLoading(false);
        setQueries(queries)
    });

    if (isLoading()) return <div>Loading...</div>

    return <EditorCtxProvider>
        <EditorView queries={queries()} currentQuery={currentQuery()} setCurrentQuery={setCurrentQuery}/>
    </EditorCtxProvider>
}

interface EditorViewProps {
    queries: QueryDTO[],
    currentQuery: QueryDTO,
    setCurrentQuery: (query: QueryDTO) => any
}

const EditorView: Component<EditorViewProps> = (props) => {
    const editorConfig = useEditorContext();

    return <div class="w-full h-full relative flex flex-row">
        <WindowWrapper position={WindowPosition.LEFT} config={editorConfig.queriesWindowConfig}
                       updateConfig={config => editorConfig.queriesWindowConfig = config}>
            <QueriesTree queries={props.queries} onQuerySelect={props.setCurrentQuery}/>
        </WindowWrapper>

        <div class={`absolute`} style={
            `left: ${editorConfig.textEditorLeftOffset}px;
             width: ${editorConfig.textEditorWith}px;`}>
            <Editor currentQuery={props.currentQuery}/>
        </div>

        <WindowWrapper position={WindowPosition.RIGHT} config={editorConfig.schemaWindowConfig}
                       updateConfig={config => editorConfig.schemaWindowConfig = config}>

        </WindowWrapper>
    </div>
}

