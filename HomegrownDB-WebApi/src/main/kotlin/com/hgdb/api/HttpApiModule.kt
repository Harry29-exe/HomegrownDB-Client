package com.hgdb.api

import com.hgdb.core.CoreModule

class HttpApiModule(
    coreModule: CoreModule
) {

    val queriesApi: QueriesApi

    init {
        queriesApi = QueriesApi(coreModule.queriesModule.queryService)
    }

}
