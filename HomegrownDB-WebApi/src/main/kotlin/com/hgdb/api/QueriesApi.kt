package com.hgdb.api

import com.hgdb.core.queries.domain.QueryService
import com.hgdb.lib.api.ApiController
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.http4k.core.*
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.routes

class QueriesApi(
    private val queryService: QueryService
) : ApiController {

    fun getAll(request: Request): Response {
        val queries = queryService.readAll()

        if (queries.isFailure) {
            return Response(Status.INTERNAL_SERVER_ERROR)
        }

        val queriesDTO = queries.getOrThrow().map(QueryDTO::fromQuery)
        val result = Json.encodeToString(queriesDTO)
        return Response( Status.OK).with(
            HttpAPI.JsonLens of result
        )
    }

    fun create(request: Request): Response {
        val requestQuery = Json.decodeFromString<QueryDTO>(request.bodyString())
        val result = queryService.create(requestQuery.toDomain())
        if (result.isFailure) {
            return Response(Status.INTERNAL_SERVER_ERROR)
        }
        val createdQuery = result.getOrThrow()
        val responseBody = Json.encodeToString(QueryDTO.fromQuery(createdQuery))
        return Response(Status.OK).with(
            HttpAPI.JsonLens of responseBody
        ).header("access-control-allow-origin", "*")
    }

    override fun register(): RoutingHttpHandler {
        return "/queries" bind routes (
            Method.GET to { request -> this.getAll(request) },
            Method.POST to { request -> this.create(request) }
        )
    }

}