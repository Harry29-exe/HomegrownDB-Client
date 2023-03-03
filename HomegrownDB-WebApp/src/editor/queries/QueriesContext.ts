import {QueryDTO} from "../../client/QueriesApi";

export interface QueriesContext {
    get queries(): QueryDTO[]
}
