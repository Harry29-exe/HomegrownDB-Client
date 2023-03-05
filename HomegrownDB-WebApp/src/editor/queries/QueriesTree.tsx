import {Component, createSignal, For, onMount} from "solid-js";
import {QueryDTO} from "../../client/QueriesApi";

export interface QueriesTreeProps {
    queries: QueryDTO[];
    onQuerySelect: (query: QueryDTO) => any
}

export const QueriesTree: Component<QueriesTreeProps> = props => {
    return <ul>
        <li class="pr-2 py-1.5 hover:bg-slate-600 hover:cursor-pointer hover:text-cyan-300 italic border-b-2"
            onclick={props.onQuerySelect(new QueryDTO(undefined, "", ""))}>
            New Query
        </li>
        <For each={props.queries}>{(query) =>
            <li class="pr-2 py-1.5 hover:bg-slate-600 hover:cursor-pointer hover:text-cyan-300"
                onclick={() => props.onQuerySelect(query)}
            >{query.name}</li>
        }
        </For>
    </ul>
}