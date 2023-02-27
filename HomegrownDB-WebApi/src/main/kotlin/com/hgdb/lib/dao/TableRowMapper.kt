package com.hgdb.lib.dao

import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.statements.InsertStatement

interface TableRowMapper<TABLE : IdTable<ID>, DOMAIN, ID: Comparable<ID>> {
    fun fromRow(row: ResultRow): DOMAIN
    fun fromDomain(stmt: InsertStatement<Number>, domain: DOMAIN)
}