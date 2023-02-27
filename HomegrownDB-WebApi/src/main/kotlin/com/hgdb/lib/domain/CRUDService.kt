package com.hgdb.lib.domain

import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.transaction

interface CRUDService<T, ID> {

    fun create(t: T): Result<T>

    fun readById(id: ID): Result<T>

    fun update(t: T): Result<T>

    fun delete(id: ID): Result<Unit>

}