package com.hgdb.lib.domain

import com.hgdb.lib.dao.CRUDDao
import com.hgdb.lib.dao.IsolationLevel
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

class SqlCRUDService<T, ID>(
    private val dao: CRUDDao<T, ID>,
    private val db: Database,
    private val isolationLevel: IsolationLevel = IsolationLevel.REPEATABLE_READ
) : CRUDService<T, ID> {

    override fun create(t: T): Result<T> {
        return transaction(isolationLevel.code(), 3, false, db) {
            dao.create(t, this)
        }
    }

    override fun readById(id: ID): Result<T> {
        return transaction(isolationLevel.code(), 3, true, db) {
            dao.readById(id, this)
        }
    }

    override fun update(t: T): Result<T> {
        return transaction(isolationLevel.code(), 3, false, db) {
            dao.update(t, this)
        }
    }

    override fun delete(id: ID): Result<Unit> {
        return transaction(isolationLevel.code(), 3, false, db) {
            dao.delete(id, this)
        }
    }
}