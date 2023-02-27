package com.hgdb.lib.dao

import com.hgdb.lib.exceptions.DBOperation
import com.hgdb.lib.exceptions.DBOperationFailedErr
import com.hgdb.lib.exceptions.NoResultsFound
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class SqlCRUDDao<TABLE : IdTable<ID>, DOMAIN, ID : Comparable<ID>>(
    private val table: TABLE,
    private val mapper: TableRowMapper<TABLE, DOMAIN, ID>
) : CRUDDao<DOMAIN, ID> {

    override fun create(t: DOMAIN, transaction: Transaction): Result<DOMAIN> {
        val result = table.insert {
            mapper.fromDomain(it, t)
        }.resultedValues

        if (result.isNullOrEmpty()){
            return Result.failure(DBOperationFailedErr(DBOperation.INSERT))
        } else if (result.size > 1) {
            throw IllegalStateException("insert returned multiple rows!")
        }
        return Result.success(mapper.fromRow(result[0]))
    }

    override fun readById(id: ID, tx: Transaction): Result<DOMAIN> {
        val result = table.select(table.id eq id)
            .singleOrNull()
            ?:
            return Result.failure(NoResultsFound())

        return Result.success(mapper.fromRow(result))
    }

    override fun update(t: DOMAIN, tx: Transaction): Result<DOMAIN> {
        TODO("Not yet implemented")
    }

    override fun delete(id: ID, tx: Transaction): Result<Unit> {
        TODO("Not yet implemented")
    }
}