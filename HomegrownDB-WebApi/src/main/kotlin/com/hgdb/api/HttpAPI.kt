package com.hgdb.api

import org.http4k.core.Body
import org.http4k.core.ContentType
import org.http4k.lens.ContentNegotiation
import org.http4k.lens.string

object HttpAPI {

    val JsonLens = Body.string(
        ContentType.APPLICATION_JSON,
        null,
        ContentNegotiation.None
    ).toLens()

}