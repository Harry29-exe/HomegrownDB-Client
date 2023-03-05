export class QueryDTO {

    constructor(
        public uuid: string | null,
        public name: string,
        public query: string
    ) {}

    clone(): QueryDTO {
        return new QueryDTO(
            this.uuid,
            this.name,
            this.query
        );
    }

    static fromJsoN(json: QueryDTO): QueryDTO {
        if (json.uuid === undefined || json.name === undefined || json.query === undefined) {
            throw new Error("object is not query")
        }
        return new QueryDTO(json.uuid, json.name, json.query)
    }

}

export class QueriesApi {
    private static readonly URL: string = "http://localhost:8080";

    getAllQueries(): Promise<QueryDTO[]> {
        return fetch(`${QueriesApi.URL}/queries`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => json.map((dtoLike: QueryDTO) => QueryDTO.fromJsoN(dtoLike)));
    }

    create(query: QueryDTO): Promise<Error | QueryDTO> {
        return fetch(`${QueriesApi.URL}/queries`, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(queryDTOLike => QueryDTO.fromJsoN(queryDTOLike))
            .catch(reason => new Error(reason))
    }

}
