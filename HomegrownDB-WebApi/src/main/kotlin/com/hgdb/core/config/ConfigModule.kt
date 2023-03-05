package com.hgdb.core.config

import com.hgdb.core.queries.dao.QueriesTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.exists
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

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
                    it[uuid] = UUID.randomUUID()
                    it[query] = "SELECT u.name FROM users u"
                }
            }
        }
    }

}