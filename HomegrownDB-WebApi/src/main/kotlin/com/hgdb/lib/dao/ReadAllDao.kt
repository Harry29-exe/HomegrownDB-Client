package com.hgdb.lib.dao

interface ReadAllDao<DOMAIN> {

    fun readAll(): Result<List<DOMAIN>>

}