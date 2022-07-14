/*
 * @Descripttion: 处理函数 - 用户
 * @Date: 2022-07-13 16:35:26
 * @LastEditTime: 2022-07-14 13:17:06
 */
const db = require('../db/index')
const bcrypt = require('bcryptjs');

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 对表单中的数据，进行合法性的校验
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({
    //         status: 1,
    //         message: '用户名或密码不合法！'
    //     })
    // }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'SELECT * FROM ev_users WHERE username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({status: 1,message: '用户名被占用，请更换用户名！'})
            return res.cc('用户名被占用，请更换用户名！')
        }
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        // 定义插入新用户的 SQL 语句
        const sql = 'INSERT INTO ev_users set ?'
        // 调用 db.query() 执行 SQL 语句
        db.query(sql,{username: userinfo.username,password: userinfo.password},(err,results)=>{
            // 判断 SQL 语句是否执行成功
            // if(err) return res.send({status: 1,message: err.message})
            if(err) return res.cc(err)
            // 判断影响行数是否为 1
            // if(results.affectedRows !== 1) return res.send({status: 1,message: '注册用户失败，请稍后再试！'})
            if(results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            // 注册用户成功
            // return res.send({status: 0,message: '注册成功！'})
            return res.cc('注册成功！',0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}