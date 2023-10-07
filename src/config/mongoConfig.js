export function mongoConfig(){
    const Options = process.env?.MONGO
    if (!Options) throw new Error("MONGO 配置不存在");
    const mongoOptions = JSON.parse(Options)
    return {
        HOST:mongoOptions?.HOST,
        PORT:mongoOptions?.PORT,
        NAME:mongoOptions?.NAME,
    }
}