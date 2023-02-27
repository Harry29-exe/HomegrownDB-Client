package com.hgdb.lib.dao

import org.jetbrains.exposed.sql.Transaction

interface CRUDDao<T, ID> {

    fun create(t: T, transaction: Transaction): Result<T>

    fun readById(id: ID, tx: Transaction): Result<T>

    fun update(t: T, tx: Transaction): Result<T>

    fun delete(id: ID, tx: Transaction): Result<Unit>

}