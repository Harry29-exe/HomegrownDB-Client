package com.hgdb.lib.api

import org.http4k.routing.RoutingHttpHandler

interface ApiController {
    fun register(): RoutingHttpHandler
}