package com.hgdb

import com.hgdb.api.HttpApiModule
import com.hgdb.core.CoreModule
import org.http4k.core.Method
import org.http4k.core.then
import org.http4k.filter.AllowAll
import org.http4k.filter.CorsPolicy
import org.http4k.filter.OriginPolicy
import org.http4k.filter.ServerFilters
import org.http4k.routing.routes
import org.http4k.server.Jetty
import org.http4k.server.asServer

fun main() {
    val coreModule = CoreModule()
    val apiModule = HttpApiModule(coreModule)

    val corsFilter = ServerFilters.Cors(CorsPolicy(
        OriginPolicy.AllowAll(),
        listOf("Content-Type"),
        listOf(Method.GET, Method.POST, Method.PUT, Method.DELETE)
    ))

    val app = corsFilter.then(routes(
        apiModule.queriesApi.register()
    ))

    app.asServer(Jetty(8080))
        .start()
}
