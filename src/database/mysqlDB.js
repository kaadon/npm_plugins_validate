import mysql from "mysql";
import {databaseConfig} from "../config/databaseConfig";

class MysqlDB {
    dbClient

    static instance

    static getInstance() {
        if (!MysqlDB.instance) {
            //逻辑代码
            MysqlDB.instance = new MysqlDB();
        }
        return MysqlDB.instance;
    }

    constructor() {
        // 实例化的时候就连接数据库，解决第一次查询太久的问题
        this._connect().then(connection => {
            this.dbClient = connection
        }).catch(err=>{
            /** 此处不抛出异常 无法捕获**/
            console.log(`实例化错误:${err.message}`)
        })
    }

    _connect() {
        let that = this;
        return new Promise((resolve, reject) => {
            if (!that.dbClient) {
                let connection = mysql.createConnection(databaseConfig())
                connection.connect(function (err) {
                    if (err) {
                        reject(new Error(err.sqlMessage))
                        return;
                    }
                    resolve(connection)
                })
            } else {
                resolve(that.dbClient);
            }
        })
    }

    mysqlQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this._connect().then((db) => {
                db.query(sql, params, function (err, results, fields) {
                    if (err) reject(new Error(err.sqlMessage));
                    resolve({results, fields})
                })
            }).catch(err => {
                reject(new Error(err.message));
            })
        })
    }
}

export default MysqlDB.getInstance