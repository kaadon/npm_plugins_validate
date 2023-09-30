import mysql from "mysql";
import {databaseConfig} from "../config/databaseConfig";

export default function mysqlQuery(sql, params, callback) {
    let connection = mysql.createConnection(databaseConfig());
    connection.connect(function (err) {
        if (err) callback && callback(new Error(err.message), null, null);
        connection.query(sql, params, function (err, results, fields) {
            if (err) callback && callback(new Error(err.sqlMessage), null, null);
            callback && callback(err, results, fields);
            connection.end(function (err) {
                if (err) callback && callback(new Error(err.sqlMessage), null, null);
            });
        });
    });
};
