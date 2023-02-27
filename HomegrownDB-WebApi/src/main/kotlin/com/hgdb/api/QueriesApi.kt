package com.hgdb.api

import com.hgdb.core.queries.QueriesModule
import com.hgdb.core.queries.domain.Query
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

//class QueryDTO(name: String, query: String)

fun Route.queryRouting(queryModule: QueriesModule) {
    val queryService = queryModule.queryService

    route("/queries") {
        get {
            val result = queryService.readAll()
            if (result.isSuccess) {
                call.respondText(Json.encodeToString(result.getOrThrow()), ContentType.Application.Json, HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.InternalServerError)
            }
        }

        post {
            val inputQuery = call.receive<Query>()
            val savedQuery = queryService.create(inputQuery)
            if (savedQuery.isSuccess) {
                call.respond(HttpStatusCode.OK, savedQuery)
            } else {
                call.respond(HttpStatusCode.InternalServerError)
            }
        }
    }

}