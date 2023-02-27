export class QueryDTO {

    constructor(
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

}
