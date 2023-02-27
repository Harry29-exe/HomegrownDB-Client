package com.hgdb

import com.hgdb.api.queryRouting
import com.hgdb.core.CoreModule
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.routing.*

fun main() {
    val startTime = System.currentTimeMillis()

    val coreModule = CoreModule()


    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(CORS) {
            allowMethod(HttpMethod.Options)
            allowMethod(HttpMethod.Put)
            allowMethod(HttpMethod.Delete)
            allowMethod(HttpMethod.Patch)
            allowHeader(HttpHeaders.Authorization)
            allowHeader("MyCustomHeader")
            anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
        }
        initAPIs(coreModule)
        val now = System.currentTimeMillis()
        println("App started in: ${(now - startTime).toDouble() / 1_000}s")
    }
        .start(wait = true)
}

fun Application.initAPIs(coreModule: CoreModule) {
    routing {
        queryRouting(coreModule.queriesModule)
    }
}

//fun Application.module() {
//    configureSerialization()
//    configureDatabases()
//    configureRouting()
//}
