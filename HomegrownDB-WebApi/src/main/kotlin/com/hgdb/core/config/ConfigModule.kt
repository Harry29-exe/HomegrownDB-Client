package com.hgdb.core.config

import com.hgdb.core.queries.dao.QueriesTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

class ConfigModule(

) {

    val appDatabase: Database = createDatabase(
//        "jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1", "root", "", "org.h2.Driver"
        "jdbc:postgresql://localhost:5432/postgres", "postgres", "123", "org.postgresql.Driver"
    )

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