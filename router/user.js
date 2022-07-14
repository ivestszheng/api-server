/*
 * @Descripttion: 路由 - 用户模块 
 * @Date: 2022-07-13 16:21:35
 * @LastEditTime: 2022-07-14 13:55:19
 */
const express = require('express')
const router = express.Router();

// 导入用户路由处理函数对应的模块
const { regUser, login } = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user');

// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema), regUser)

// 登录
router.post('/login',expressJoi(reg_login_schema), login)

// 将路由对象共享出去
module.exports = router