package com.hgdb.lib.domain

import com.hgdb.lib.dao.IsolationLevel
import com.hgdb.lib.dao.ReadAllDao
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

class SqlReadAllService<DOMAIN>(
    private val dao: ReadAllDao<DOMAIN>,
    private val db: Database,
    private val txIsolationLevel: IsolationLevel = IsolationLevel.COMMITTED_READ
) : ReadAllService<DOMAIN> {

    override fun readAll(): Result<List<DOMAIN>> {
        return transaction(txIsolationLevel.code(), 3, true, db) {
            dao.readAll()
        }
    }

}