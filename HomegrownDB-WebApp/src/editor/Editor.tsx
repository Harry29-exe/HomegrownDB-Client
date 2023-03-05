import {Component, createEffect, createSignal, Show} from "solid-js";
import {DBClient} from "../client/DBClient";
import {ResultTable} from "./results/ResultTable";
import {SQLTextEditor} from "./text-editor/SQLTextEditor";
import {useQueriesContext} from "./queries/QueriesContext";
import {QueryDTO} from "../client/QueriesApi";

export const Editor: Component = () => {
    const queriesContext = useQueriesContext();
    const dbClient = new DBClient();

    const [editedQuery, setEditedQuery] = createSignal<QueryDTO>(new QueryDTO(null, "", ""))
    createEffect(() => {
        if (queriesContext.currentQuery) {
            const query = queriesContext.currentQuery
            setEditedQuery(query.clone());
        }
    })

    const saveQuery = () => {
        queriesContext.save(editedQuery())
            .then(result => console.log(result))
    }

    const [results, setResult] = createSignal<any[]>([]);
    const executeQuery = () => {
        dbClient.executeQuery(editedQuery().query)
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
            <input value={editedQuery().name} class="bg-transparent border-none caret-white text-green-500 font-bold
            focus:border-0 focus:outline-none" oninput={(event) => editedQuery().name = event.currentTarget.value}/>
            <button onClick={() => saveQuery()}
                    class="hover:bg-green-600 text-white px-2 py-1 text-base border-x-2 border-slate-900">
                Save
            </button>

            <div class="grow h-1 w-1"/>

            <button onclick={executeQuery}
                    class="hover:bg-green-600 text-white px-2 py-1 text-base border-x-2 border-slate-900">
                Exec
            </button>
        </div>

        <SQLTextEditor query={editedQuery().query} onQueryUpdate={(newQuery) => editedQuery().query = newQuery}/>


        <Show when={results().length > 0} keyed>
            <ResultTable Header={tableHeaders()} Rows={tableResults()}/>
        </Show>
    </>
}

