export function redisConfig(){
    const Options = process.env?.REDIS
    if (!Options) throw new Error("redis 配置不存在");
    const redisOptions = JSON.parse(Options)
    return {
        host:redisOptions?.HOST,
        password:redisOptions?.PASSWORD,
        prot:redisOptions?.PORT,
        db:redisOptions?.DB
    }
}