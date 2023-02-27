package com.hgdb.lib.dao

enum class IsolationLevel(private val rawValue: Int) {

    UNCOMMITTED_READ(1),
    COMMITTED_READ(2),
    REPEATABLE_READ(3),
    DESERIALIZABLE(4);

    fun code(): Int = rawValue

}