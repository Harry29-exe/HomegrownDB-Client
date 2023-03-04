package com.hgdb

import com.hgdb.core.CoreModule

fun main() {
//    val coreModule = CoreModule()


//    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = createInitAppFun(coreModule))
//        .start(wait = true)
}

//fun createInitAppFun(coreModule: CoreModule): Application.() -> Unit {
//    return fun Application.() {
//        val startTime = System.currentTimeMillis()
//
//        configureCORS()
//        initAPIs(coreModule)
//
//        val now = System.currentTimeMillis()
//        println("App started in: ${(now - startTime).toDouble() / 1_000}s")
//    }
//}
//
//fun Application.initAPIs(coreModule: CoreModule) {
//    routing {
//        queryRouting(coreModule.queriesModule)
//    }
//}
//
//fun Application.configureCORS() {
//    install(CORS) {
//        allowMethod(HttpMethod.Options)
//        allowMethod(HttpMethod.Put)
//        allowMethod(HttpMethod.Delete)
//        allowMethod(HttpMethod.Patch)
//        allowHeader(HttpHeaders.Authorization)
//        allowHeader("MyCustomHeader")
//        anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
//    }
//}

//fun Application.module() {
//    configureSerialization()
//    configureDatabases()
//    configureRouting()
//}
