package com.hgdb.core.queries.domain

import com.hgdb.lib.domain.Domain
import kotlinx.serialization.Serializable

@Serializable
class Query(
    val id: Long = Domain.INVALID_ID,
    var name: String,
    var query: String
    ) {
}