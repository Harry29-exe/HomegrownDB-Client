import {Component, For} from "solid-js";

export interface ResultTableProps {
    Header: string[]
    Rows: Row[]
}

export type Row = any[]

export const ResultTable: Component<ResultTableProps> = props => {
    return <table class="w-full bg-slate-600 text-white">
        <TableHeader header={props.Header}/>
        <For each={props.Rows}>{row =>
            <TableRow row={row}/>
        }
        </For>
    </table>
}

const TableRow: Component<{row: Row}> = props => {
    return <tr>
        <For each={props.row}>{row =>
            <td class="border border-slate-900 px-1 py-0.5">{row}</td>
        }
        </For>
    </tr>
}

const TableHeader: Component<{header: string[]}> = props => {
    return <tr>
        <For each={props.header}>{row =>
            <td class="border border-slate-900 px-1 py-0.5 bg-slate-800">
                {row}
            </td>
        }
        </For>
    </tr>
}