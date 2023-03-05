package com.hgdb.core.queries.domain

import com.hgdb.lib.domain.Domain
import java.util.*

class Query(
    val id: Long = Domain.INVALID_ID,
    val uuid: UUID = UUID.randomUUID(),
    var name: String,
    var query: String
    ) {
}