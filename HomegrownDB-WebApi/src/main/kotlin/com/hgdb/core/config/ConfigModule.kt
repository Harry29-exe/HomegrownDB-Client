package com.hgdb.core.config

import com.hgdb.core.queries.dao.QueriesTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

class ConfigModule(

) {

    val appDatabase: Database = createDatabase(
        "jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1", "root", "", "org.h2.Driver"
    )

    init {
        transaction(appDatabase) {
            SchemaUtils.create(QueriesTable)
            println("queries table created")
            QueriesTable.insert {
                it[name] = "my_query"
                it[query] = "SELECT u.name FROM users u"
            }
            QueriesTable.selectAll().forEach{
                println(it[QueriesTable.name])
            }
        }
    }

}