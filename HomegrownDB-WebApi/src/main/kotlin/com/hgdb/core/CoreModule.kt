package com.hgdb.core

import com.hgdb.core.config.ConfigModule
import com.hgdb.core.config.ConfigModuleProviders
import com.hgdb.core.queries.QueriesModule

class CoreModule(
    configModuleProviders: ConfigModuleProviders = ConfigModuleProviders()
) {
    private val configModule: ConfigModule
    val queriesModule: QueriesModule

    init {
        configModule = ConfigModule(configModuleProviders)
        queriesModule = QueriesModule(QueriesModule.Deps(configModule))
    }

}