package com.hgdb.api

import com.hgdb.core.CoreModule
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.http4k.core.*
import org.http4k.lens.ContentNegotiation
import org.http4k.lens.string
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.Test

class QueriesApiTest {

    @Test
    fun `test readAll queries`() {
        val testModule = setUp()
        val core = testModule.first
        val queriesApi = testModule.second

        transaction(core.configModule.appDatabase) {
            val query = QueryDTO(null, "my query", "SELECT we FROM we")
            queriesApi.create(
                Request(Method.POST, "/queries").with(
                    Body.string(ContentType.APPLICATION_JSON, null, ContentNegotiation.None).toLens() of
                            Json.encodeToString(query)
                )
            )

            val response = queriesApi.getAll(Request(Method.GET, "/queries"))
            val returnedQueries = Json.decodeFromString<Array<QueryDTO>>(response.bodyString())
            assert(returnedQueries.size == 2)

            this.rollback()
        }
    }

    private fun setUp(): Pair<CoreModule, QueriesApi> {
//        val coreModule = CoreModule(ConfigModuleProviders(databaseProvider = {DatabaseProvider.testDatabase()}))
        val coreModule = CoreModule()
        var queriesApi = QueriesApi(coreModule.queriesModule.queryService)

        return Pair(coreModule, queriesApi)
    }

}