/*
 * @Descripttion: 
 * @Date: 2022-07-14 15:23:07
 * @LastEditTime: 2022-07-15 10:31:18
 */
// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = 'SELECT id,username,nickname,email,user_pic FROM ev_users WHERE id=?'
    // 调用 db.query() 执行 SQL 语句
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        return res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    // 定义待执行的 SQL 语句
    const sql = 'update ev_users set ? where id=?'
    // 调用 db.query() 执行 SQL 语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败')
        return res.cc('更新用户信息成功！', 0)
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // 根据 id 查询用户信息
    const sql = 'SELECT * FROM ev_users WHERE id=?'
    // 执行根据 id 查询用户的信息的 SQL 语句
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户不存在！')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        // 更新数据库中的密码
        const updateSql = 'UPDATE ev_users SET password=? WHERE id=?'
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(updateSql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            // 成功
            return res.cc('更新密码成功！', 0)
        })
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req,res)=>{
    // 定义更新头像的 SQL 语句
    const sql = 'UPDATE ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新头像失败！')
        return res.cc('更换头像成功',0)
    })
}