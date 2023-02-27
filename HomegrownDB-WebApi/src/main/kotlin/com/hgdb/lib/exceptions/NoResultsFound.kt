package com.hgdb.lib.exceptions

class NoResultsFound(msg: String? = "No resource found", cause: Throwable? = null) : Throwable(msg, cause)