package com.hgdb.core.config

import org.jetbrains.exposed.sql.Database

fun createDatabase (
    url: String,
    user: String,
    password: String,
    driver: String
): Database {

    return Database.connect(
        url = url,
        user = user,
        password = password,
        driver = driver
    )
}