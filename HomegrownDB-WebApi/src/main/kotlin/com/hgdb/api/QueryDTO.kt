package com.hgdb.api

import com.hgdb.core.queries.domain.Query
import kotlinx.serialization.Serializable

@Serializable
data class QueryDTO(
    val uuid: String?,
    val name: String,
    val query: String
) {

    companion object {
        fun fromQuery(query: Query): QueryDTO {
            return QueryDTO(
                query.uuid.toString(),
                query.name,
                query.query
            )
        }
    }

    fun toDomain(): Query {
        return Query(name = name, query =  query)
    }

}