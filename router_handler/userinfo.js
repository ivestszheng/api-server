/*
 * @Descripttion: 
 * @Date: 2022-07-14 15:23:07
 * @LastEditTime: 2022-07-14 15:35:59
 */
// 导入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
module.exports = (req,res)=>{
    // 定义查询用户信息的 SQL 语句
    const sql = 'SELECT id,username,nickname,email,user_pic FROM ev_users WHERE id=?'
    // 调用 db.query() 执行 SQL 语句
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        return res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        }) 
    })
}