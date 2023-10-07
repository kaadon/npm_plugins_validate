export function databaseConfig() {
    const databaseENV = process.env?.MYSQL
    if (!databaseENV) throw new Error("mysql 配置不存在");
    const databaseEnvConfig = JSON.parse(databaseENV)
    return {
        host: databaseEnvConfig?.HOST,
        port: databaseEnvConfig?.PORT,
        database: databaseEnvConfig?.NAME,
        user: databaseEnvConfig?.USER,
        password: databaseEnvConfig?.PWD,
    }
}
