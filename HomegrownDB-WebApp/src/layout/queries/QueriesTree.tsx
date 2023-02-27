import {Component, For} from "solid-js";

export interface QueriesTreeProps {
    queries: {queryName: string, query: string}[]
}

export const QueriesTree: Component<QueriesTreeProps> = props => {
    return <ul>
        <For each={props.queries}>{(query) =>
            <li>{query.queryName}</li>
        }
        </For>
    </ul>
}