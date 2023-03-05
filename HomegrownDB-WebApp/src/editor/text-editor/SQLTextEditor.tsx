import {Component, createEffect, createSignal} from "solid-js";
import {SyntaxService} from "./syntax/SyntaxService";
import {TokensView} from "./TokensView";

interface SQLTextEditorProps {
    query: string;
    onQueryUpdate: (query: string) => any;
}

export const SQLTextEditor: Component<SQLTextEditorProps> = props => {
    const syntaxService = new SyntaxService();
    const [query, setQuery] = createSignal<string>(props.query)
    createEffect(() => {
        setQuery(props.query)
    })

    const tokens = () => syntaxService.tokenize(query());
    const update = (newQuery: string) => {
        setQuery(newQuery);
        props.onQueryUpdate(newQuery);
    }

    return <div class="w-full h-[300px] relative bg-slate-800 text-white">
        <div class="absolute top-0 left-0 w-full h-full">
            <TokensView tokens={tokens()}/>
        </div>
        <textarea class="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white"
                  oninput={event => update(event.currentTarget.value)}>
            {query()}
        </textarea>
    </div>
}