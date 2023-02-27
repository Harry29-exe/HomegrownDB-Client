package com.hgdb.core.queries.dao

import org.jetbrains.exposed.dao.id.LongIdTable

internal object QueriesTable : LongIdTable("Queries") {

    val name = varchar("name", 255)
    val query = varchar("query", Short.MAX_VALUE.toInt())

}