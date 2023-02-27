package com.hgdb.lib.domain

interface ReadAllService<DOMAIN> {

    fun readAll(): Result<List<DOMAIN>>

}