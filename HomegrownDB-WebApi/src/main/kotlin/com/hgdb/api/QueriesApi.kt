package com.hgdb.api

import com.hgdb.core.queries.QueriesModule
import com.hgdb.core.queries.domain.Query
import com.hgdb.core.queries.domain.QueryService



//class QueryDTO(name: String, query: String)

//fun Route.queryRouting(queryModule: QueriesModule) {
//    val queriesApi = QueriesApi(queryModule.queryService)
//
//    route("/queries") {
//        get { queriesApi.getAllQueries(this) }
//
//        post { queriesApi.createQuery(this) }
//    }
//
//}
//
//typealias RequestCtx = PipelineContext<Unit, ApplicationCall>
//
//class QueriesApi(
//    val queryService: QueryService
//) {
//
//    suspend inline fun getAllQueries(ctx: RequestCtx) {
//        val result = queryService.readAll()
//        if (result.isSuccess) {
//            ctx.context.respondText(
//                Json.encodeToString(result.getOrThrow()),
//                ContentType.Application.Json,
//                HttpStatusCode.OK
//            )
//        } else {
//            ctx.call.respond(HttpStatusCode.InternalServerError)
//        }
//    }
//
//    suspend inline fun createQuery(ctx: RequestCtx) {
//        val body = ctx.call.receiveText()
//        val inputQuery = Json.decodeFromString<Query>(body)
//
//        val savedQuery = queryService.create(inputQuery)
//        if (savedQuery.isSuccess) {
//            ctx.call.respond(HttpStatusCode.OK, savedQuery)
//        } else {
//            ctx.call.respond(HttpStatusCode.InternalServerError)
//        }
//    }
//
//}