export class DBClient {

    private  url: string = "http://localhost:8081"

    executeQuery(query: string): Promise<any[]>
    {
        return fetch(this.url + "/db-api/query", {
            body: JSON.stringify({
                TxId: null,
                Query: query,
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST'
        }).then(response => response.json());
    }

}