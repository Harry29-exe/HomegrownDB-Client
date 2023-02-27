package com.hgdb.core.queries.domain

import com.hgdb.lib.domain.CRUDService
import com.hgdb.lib.domain.ReadAllService
import com.hgdb.lib.domain.SqlCRUDService
import com.hgdb.lib.domain.SqlReadAllService
import com.hgdb.core.queries.dao.QueryDao
import org.jetbrains.exposed.sql.Database

class QueryService(
    db: Database,
    dao: QueryDao
) : CRUDService<Query, Long>, ReadAllService<Query> {
    private val crudService = SqlCRUDService(dao, db)
    private val readAllService = SqlReadAllService(dao, db)

    override fun create(t: Query): Result<Query> =
        crudService.create(t)

    override fun readById(id: Long): Result<Query> =
        crudService.readById(id)

    override fun update(t: Query): Result<Query> =
        crudService.update(t)

    override fun delete(id: Long): Result<Unit> =
        crudService.delete(id)

    override fun readAll(): Result<List<Query>> =
        readAllService.readAll()
}