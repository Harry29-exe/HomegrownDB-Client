import {Component} from "solid-js";
import {Editor} from "./editor/Editor";
import {QueriesTree} from "./queries/QueriesTree";
import {VerticalDivider} from "../components/VerticalDivider";

export const EditorWindow: Component = () => {
    const initialQuery = 'SELECT c.id, c.col_name, c.relation_oid FROM sys_columns c';
    const dummyQueries = [{queryName: "select-users", query: initialQuery}];

    return <div class="w-full h-full relative flex flex-row">
        <div class="w-1/4 h-full">
            <QueriesTree queries={dummyQueries}/>
        </div>

        <VerticalDivider/>

        <div class="w-3/4 h-full">
            <Editor initialContent={initialQuery}/>
        </div>
    </div>
}