package com.hgdb.core.queries

import com.hgdb.core.config.ConfigModule
import com.hgdb.core.queries.dao.QueryDao
import com.hgdb.core.queries.domain.QueryService

class QueriesModule(
    deps: Deps
) {

    val queryService: QueryService;

    init {
        val queryDao = QueryDao()
        queryService = QueryService(deps.configModule.appDatabase, queryDao)
    }

    class Deps(val configModule: ConfigModule)
}
