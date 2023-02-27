package com.hgdb.lib.exceptions

enum class DBOperation {
    INSERT,
    SELECT,
    UPDATE,
    DELETE
}

class DBOperationFailedErr(
    operation: DBOperation,
    msg: String?,
    cause: Exception?
) : RuntimeException(
    "db operation: $operation failed${msg?.run { "with message: $msg" }}",
    cause
) {

    constructor(operation: DBOperation) : this(operation, null, null)
    constructor(operation: DBOperation, msg: String?) : this(operation, msg, null)

}