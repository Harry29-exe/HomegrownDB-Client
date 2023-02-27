package com.hgdb.core

import com.hgdb.core.config.ConfigModule
import com.hgdb.core.queries.QueriesModule

class CoreModule {
    private val configModule = ConfigModule()

    val queriesModule = QueriesModule(configModule)
}