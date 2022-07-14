/*
 * @Descripttion: 用户信息校验模块
 * @Date: 2022-07-14 13:10:47
 * @LastEditTime: 2022-07-14 16:26:30
 */
// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 定义 id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userinfo_schema = {
    // 需要对 req.body 里面的数据进行验证
    body: {
        id,
        nickname,
        email
    }
}