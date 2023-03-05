export class QueryDTO {

    constructor(
        public uuid: string | undefined,
        public name: string,
        public query: string
    ) {}
}

export class QueriesApi {
    private static readonly URL: string = "http://localhost:8080";

    getAllQueries(): Promise<QueryDTO[]> {
        return fetch(`${QueriesApi.URL}/queries`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(body => body)
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
            .catch(reason => new Error(reason))
    }

}
