package com.hgdb.core.queries

import com.hgdb.core.config.ConfigModule
import com.hgdb.core.queries.dao.QueryDao
import com.hgdb.core.queries.domain.QueryService

class QueriesModule(
    configModule: ConfigModule
) {

    private val queryDao = QueryDao()

    val queryService = QueryService(configModule.appDatabase, queryDao)


}