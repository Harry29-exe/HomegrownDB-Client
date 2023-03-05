import {Component, createEffect, createSignal, Show} from "solid-js";
import {SyntaxService} from "./text-editor/syntax/SyntaxService";
import {TokensView} from "./text-editor/TokensView";
import {DBClient} from "../client/DBClient";
import {ResultTable} from "./results/ResultTable";
import {QueryDTO} from "../client/QueriesApi";

export interface EditorProps {
    currentQuery: QueryDTO
}

export const Editor: Component<EditorProps> = (props: EditorProps) => {
    const dbClient = new DBClient();
    const syntaxService = new SyntaxService();

    const [query, setQuery] = createSignal<string>(props.currentQuery?.query ?? '')
    createEffect(() => {
        if (props.currentQuery) {
            setQuery(props.currentQuery.query);
        }
    })

    const tokens = () => syntaxService.tokenize(query());
    const update = (content: string) => setQuery(content);

    const [results, setResult] = createSignal<any[]>([]);
    const executeQuery = () => {
        dbClient.executeQuery(query())
            .then(results => setResult(results));
    }
    const tableResults = () => {
        return results().map(obj => Object.values(obj))
    }
    const tableHeaders = () => {
        let firstRow = results()[0];
        return Object.keys(firstRow);
    }

    return <>
        <div class="w-full h-8 bg-slate-700 flex items-center px-2 border-b-2 border-slate-900">
            <input value={props.currentQuery?.name ?? 'new query'} class="bg-transparent border-none caret-white text-green-500 font-bold
            focus:border-0 focus:outline-none"/>
            <button onClick={() => alert("not implemented")}
                    class="hover:bg-green-600 text-white px-2 py-1 text-base border-x-2 border-slate-900">
                Save
            </button>

            <div class="grow h-1 w-1"/>

            <button onclick={executeQuery}
                    class="hover:bg-green-600 text-white px-2 py-1 text-base border-x-2 border-slate-900">
                Exec
            </button>
        </div>

        <div class="w-full h-[300px] relative bg-slate-800 text-white">
            <div class="absolute top-0 left-0 w-full h-full">
                <TokensView tokens={tokens()}/>
            </div>
            <textarea class="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white"
                      oninput={event => update(event.currentTarget.value)}>
                {query()}
            </textarea>
        </div>


        <Show when={results().length > 0} keyed>
            <ResultTable Header={tableHeaders()} Rows={tableResults()}/>
        </Show>
    </>
}

