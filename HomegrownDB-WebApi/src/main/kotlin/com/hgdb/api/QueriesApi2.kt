package com.hgdb.api

import com.hgdb.core.queries.domain.Query
import com.hgdb.core.queries.domain.QueryService
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import kotlinx.serialization.json.*
import org.http4k.core.*
import org.http4k.lens.ContentNegotiation
import org.http4k.lens.string

interface ApiController {
    fun register(): RoutingHttpHandler
}

class QueriesApi(
    private val queryService: QueryService
) : ApiController {

    fun getAll(request: Request): Response {
        val queries = queryService.readAll()

        if (queries.isFailure) {
            return Response(Status.INTERNAL_SERVER_ERROR)
        }
        val result = Json.encodeToString(queries.getOrThrow())
        return Response( Status.OK).with(
            Body.string(ContentType.APPLICATION_JSON, null, ContentNegotiation.None).toLens() of result
        )
    }

    fun create(request: Request): Response {
        val query = Json.decodeFromString<Query>(request.bodyString())
        queryService.create(query)

        return Response(Status.OK)
    }

    override fun register(): RoutingHttpHandler {
        return "/queries" bind { request -> this.getAll(request) }
    }

}