package com.hgdb

import com.hgdb.api.queryRouting
import com.hgdb.core.CoreModule
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*

fun main() {
    val coreModule = CoreModule()

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        initAPIs(coreModule)
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
