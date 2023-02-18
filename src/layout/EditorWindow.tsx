import {Component} from "solid-js";
import {Editor} from "./editor/Editor";
import {QueriesTree} from "./queries/QueriesTree";
import {VerticalDivider} from "../components/VerticalDivider";

export const EditorWindow: Component = () => {
    const dummyQueries = [{queryName: "select-users", query: ""}];

    return <div class="w-full h-full relative flex flex-row">
        <div class="w-1/4 h-full">
            <QueriesTree queries={dummyQueries}/>
        </div>

        <VerticalDivider/>

        <div class="w-3/4 h-full">
            <Editor initialContent={""}/>
        </div>
    </div>
}