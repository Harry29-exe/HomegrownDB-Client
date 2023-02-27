package com.hgdb.core.queries.dao

import com.hgdb.lib.dao.*
import com.hgdb.core.queries.domain.Query
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement

class QueryDao : CRUDDao<Query, Long>, ReadAllDao<Query> {
    private val mapper = QueryTableMapper()
    private val table = QueriesTable
    private val crudDao = SqlCRUDDao(table, mapper)
    private val readAllDao = SqlReadAllDao(table, mapper)

    override fun create(t: Query, transaction: Transaction): Result<Query> =
        crudDao.create(t, transaction)

    override fun readById(id: Long, tx: Transaction): Result<Query> =
        crudDao.readById(id, tx)

    override fun update(t: Query, tx: Transaction): Result<Query> =
        crudDao.update(t, tx)

    override fun delete(id: Long, tx: Transaction): Result<Unit> =
        crudDao.delete(id, tx)

    override fun readAll(): Result<List<Query>> =
        readAllDao.readAll()

}

private class QueryTableMapper : TableRowMapper<QueriesTable, Query, Long> {
    override fun fromRow(row: ResultRow): Query {
        return Query(
            row[QueriesTable.id].value,
            row[QueriesTable.name],
            row[QueriesTable.query]
        )
    }

    override fun fromDomain(stmt: InsertStatement<Number>, domain: Query) {
        stmt[QueriesTable.id] = domain.id
        stmt[QueriesTable.name] = domain.name
        stmt[QueriesTable.query] = domain.query
    }
}