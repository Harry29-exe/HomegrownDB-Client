import {createSignal} from "solid-js";
import {QueriesApi, QueryDTO} from "../../client/QueriesApi";
import {createStore} from "solid-js/store"

export interface QueriesManager {
    get queries(): QueryDTO[]
    get currentQuery(): QueryDTO

    load(): Promise<Error | null>
    save(queryDTO: QueryDTO): Promise<Error | QueryDTO>
    setCurrentQuery(query: QueryDTO): void
}

export class QueriesManagerImpl implements QueriesManager {
    private client = new QueriesApi();
    private queriesState = createStore<QueryDTO[]>([])
    private currentQueryState = createSignal<QueryDTO>(new QueryDTO(undefined, "", ""))

    constructor() {
    }

    get queries(): QueryDTO[] {
        return this.queriesState[0];
    }

    get currentQuery(): QueryDTO {
        return this.currentQueryState[0]();
    }

    load(): Promise<Error | null> {
        return this.client.getAllQueries()
            .then(queries => {
                this.queriesState[1](queries)
                return null
            })
            .catch(reason => new Error(reason));
    }

    save(queryDTO: QueryDTO): Promise<Error | QueryDTO> {
        return this.client.create(queryDTO)
            .then(value => {
                if (value instanceof Error) {
                    return value;
                }
                this.queriesState[1]([...this.queriesState[0], queryDTO])
                return value;
            })
    }

    setCurrentQuery(query: QueryDTO): void {
        this.currentQueryState[1](query)
    }

}
