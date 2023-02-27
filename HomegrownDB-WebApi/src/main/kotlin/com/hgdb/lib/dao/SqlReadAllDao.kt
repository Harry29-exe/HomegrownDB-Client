package com.hgdb.lib.dao

import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.selectAll

class SqlReadAllDao<TABLE : IdTable<ID>, DOMAIN, ID : Comparable<ID>>(
    private val table: TABLE,
    private val mapper: TableRowMapper<TABLE, DOMAIN, ID>
) : ReadAllDao<DOMAIN> {

    override fun readAll(): Result<List<DOMAIN>> {
        val queries = table.selectAll()
            .map(mapper::fromRow)

        return Result.success(queries)
    }
}