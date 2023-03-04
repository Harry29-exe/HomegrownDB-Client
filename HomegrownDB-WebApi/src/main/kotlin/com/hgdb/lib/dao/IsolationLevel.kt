package com.hgdb.lib.dao

import java.sql.Connection

enum class IsolationLevel(private val rawValue: Int) {

    UNCOMMITTED_READ(Connection.TRANSACTION_READ_UNCOMMITTED),
    COMMITTED_READ(Connection.TRANSACTION_READ_COMMITTED),
    REPEATABLE_READ(Connection.TRANSACTION_REPEATABLE_READ),
    DESERIALIZABLE(Connection.TRANSACTION_SERIALIZABLE);

    fun code(): Int = rawValue

}