// 引入MongoDB数据库模块
const {MongoClient, ObjectID} = require('mongodb');
import {mongoConfig} from "../config/mongoConfig";
// 获得数据库客户端
// 引入数据库的配置文件

class MongoDB {
    dbClient

    static instance

    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    constructor() {
        // 实例化的时候就连接数据库，解决第一次查询太久的问题
        this._connect().then(client => this.dbClient = client).catch(err => console.log(`实例化错误:${err.message}`));
    }

    // 连接数据库
    async _connect() {
        let that = this;
        let congoDbConfig = mongoConfig();

        //  解决数据库多次连接的问题
        if (!that.dbClient) {
            try {
                //逻辑代码
                let Client = await MongoClient.connect(`mongodb://${congoDbConfig.HOST}:${congoDbConfig.PORT}`)
                that.dbClient = Client.db(congoDbConfig.NAME)
                return Promise.resolve(that.dbClient)
            } catch (e) {
                return Promise.reject(e.message);
            }
        } else {
            return Promise.resolve(that.dbClient);
        }
    }


    // 查找方法
    find(collectionName, json, limit = null) {
        return new Promise((resolve, reject) => {
            this._connect().then((db) => {
                let result = db.collection(collectionName).find(json);
                if (limit) result.limit(parseInt(limit));
                result.toArray()
                    .then(resolve)
                    .catch(reject);
            }).catch(err => reject(err))
        })
    }

    // 更新方法
    update(collectionName, oldJson, newJson) {
        return new Promise((resolve, reject) => {
            this._connect().then((db) => {
                db.collection(collectionName)
                    .updateOne(oldJson, {
                        $set: newJson
                    })
                    .then(resolve)
                    .catch(reject)
            }).catch(err => reject(err))
        })
    }

    // 插入数据
    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this._connect().then((db) => {
                db.collection(collectionName)
                    .insertOne(json)
                    .then(resolve)
                    .catch(reject)
            }).catch(err => reject(err))
        })
    }

    // 删除数据
    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this._connect().then((db) => {
                db.collection(collectionName)
                    .removeOne(json)
                    .then(resolve)
                    .catch(reject)
            }).catch(err => reject(err))
        })
    }

    // mongodb里面查询_id需要把字符串转换成对象
    getObjectId(id) {
        return new ObjectID(id);
    }
}


export default MongoDB.getInstance