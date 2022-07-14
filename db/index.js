/*
 * @Descripttion: 数据库连接模块
 * @Date: 2022-07-14 09:28:06
 * @LastEditTime: 2022-07-14 10:23:31
 */
const mysql = require('mysql');

const db = mysql.createPool({
    host: '192.168.102.191',
    user: 'root',
    password: 'root',
    database: 'my_db_01'
})

module.exports = db