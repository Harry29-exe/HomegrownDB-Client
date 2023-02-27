import {Component, createSignal, For, onMount} from "solid-js";
import {QueryDTO} from "../../client/QueriesApi";

export interface QueriesTreeProps {
    queries: QueryDTO[];
    onQuerySelect: (query: QueryDTO) => any
}

export const QueriesTree: Component<QueriesTreeProps> = props => {
    return <ul>
        <For each={props.queries}>{(query) =>
            <li class="pr-2 py-1.5"
            >{query.name}</li>
        }
        </For>
    </ul>
}