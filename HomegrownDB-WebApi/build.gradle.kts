val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val exposed_version: String by project
val h2_version: String by project
val postgres_version: String by project
val koin_version: String by project

plugins {
    kotlin("jvm") version "1.8.10"
    id("io.ktor.plugin") version "2.2.3"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.8.10"
}

group = "com.hgdb"
version = "0.0.1"
application {
    mainClass.set("com.hgdb.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("com.h2database:h2:$h2_version")
    implementation("org.postgresql:postgresql:$postgres_version")
//    implementation("ch.qos.logback:logback-classic:$logback_version")
//    implementation("io.ktor:ktor-server-core-jvm:2.2.4")
//    implementation("io.ktor:ktor-server-content-negotiation-jvm:2.2.4")
//    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:2.2.4")
//    implementation("io.ktor:ktor-server-cors:2.2.4")
//    implementation("io.ktor:ktor-server-netty-jvm:2.2.4")
//    implementation("io.ktor:ktor-server-cors-jvm:2.2.4")
//    implementation("org.koin:koin-core:$koin_version")
//    compileOnly("io.insert-koin:koin-core:3.3.3")
//    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
//    testImplementation("io.ktor:ktor-server-tests-jvm:2.2.4")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
    implementation("org.http4k:http4k-core:4.40.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0")
}