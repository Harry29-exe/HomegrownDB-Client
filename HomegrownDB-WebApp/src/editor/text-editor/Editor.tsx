import {Component, ComponentProps, createEffect, createSignal, Show} from "solid-js";
import {Token} from "./syntax/token/Token";
import {SyntaxService} from "./syntax/SyntaxService";
import {TokensView} from "./TokensView";
import {DBClient} from "../../client/DBClient";
import {ResultTable} from "../results/ResultTable";

export interface EditorProps {
    initialContent: string
}

export const Editor: Component<EditorProps> = (props: EditorProps) => {
    const dbClient = new DBClient();
    const syntaxService = new SyntaxService();

    const [query, setQuery] = createSignal<string>(props.initialContent)
    createEffect(() => {
        setQuery(props.initialContent);
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
        <div class="w-full h-[300px] relative bg-slate-800 text-white">
            <div class="absolute top-0 left-0 w-full h-full">
                <TokensView tokens={tokens()}/>
            </div>
            <textarea class="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white"
                      oninput={event => update(event.currentTarget.value)}>
                {props.initialContent}
            </textarea>
        </div>

        <div class="w-full h-16 bg-slate-700 flex items-center px-2">
            <button onclick={executeQuery}
                    class="rounded-xl bg-green-600 text-white p-2"
            >Send</button>
        </div>

        <Show when={results().length > 0} keyed>
            <ResultTable Header={tableHeaders()} Rows={tableResults()}/>
        </Show>
    </>
}

