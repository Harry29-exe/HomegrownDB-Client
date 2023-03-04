package com.hgdb.core.config

import org.jetbrains.exposed.sql.Database

object DatabaseProvider {

    fun stdDatabase (): Database {

        return Database.connect(
            url = "jdbc:postgresql://localhost:5432/postgres",
            user = "postgres",
            password = "123",
            driver = "org.postgresql.Driver"
        )
    }

    fun testDatabase(): Database {
        return Database.connect(
            url = "jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1",
            user = "root",
            password = "",
            driver = "org.h2.Driver"
        )
    }

    //        "jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1", "root", "", "org.h2.Driver"

}
