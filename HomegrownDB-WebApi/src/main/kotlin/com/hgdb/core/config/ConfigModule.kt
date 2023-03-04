package com.hgdb.core.config

import com.hgdb.core.queries.dao.QueriesTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

data class ConfigModuleProviders(
    val databaseProvider: () -> Database = { DatabaseProvider.stdDatabase() }
)

class ConfigModule(
    providers: ConfigModuleProviders
) {

    val appDatabase: Database = providers.databaseProvider()

    init {

        transaction(appDatabase) {
            if (!QueriesTable.exists()) {
                SchemaUtils.create(QueriesTable)

                QueriesTable.insert {
                    it[name] = "my_query"
                    it[query] = "SELECT u.name FROM users u"
                }
            }
        }
    }

}