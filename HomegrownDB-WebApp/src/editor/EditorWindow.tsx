import {Accessor, Component, createSignal, onMount, Setter, Signal} from "solid-js";
import {Editor} from "./text-editor/Editor";
import {QueriesTree} from "./queries/QueriesTree";
import {VerticalDivider} from "../components/VerticalDivider";
import {QueriesApi, QueryDTO} from "../client/QueriesApi";

class EditorState {
    constructor(
        private currentQueryState: Signal<QueryDTO>,
        private queriesState: Signal<QueryDTO[]>,
    ) {
    }

    get queries(): QueryDTO[] {
        return this.queriesState[0]()
    }

    get currentQuery(): QueryDTO {
        return this.currentQueryState[0]()
    }

    set currentQuery(query: QueryDTO) {
        this.currentQueryState[1](query)
    }

}

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

    const editorState = new EditorState(
        [currentQuery, setCurrentQuery],
        [queries, setQueries]);

    return <EditorView state={editorState}/>
}

const EditorView: Component<{state: EditorState}> = (props) => {
    const editorState = props.state;

    return <div class="w-full h-full relative flex flex-row">
        <div class="w-1/4 h-full">
            <QueriesTree queries={editorState.queries} onQuerySelect={query => editorState.currentQuery = query}/>
        </div>

        <VerticalDivider/>

        <div class="w-3/4 h-full">
            <Editor initialContent={editorState.currentQuery.query}/>
        </div>
    </div>
}

