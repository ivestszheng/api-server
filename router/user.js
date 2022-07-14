/*
 * @Descripttion: 路由 - 用户模块 
 * @Date: 2022-07-13 16:21:35
 * @LastEditTime: 2022-07-13 16:40:03
 */
const express = require('express')
const router = express.Router();

// 导入用户路由处理函数对应的模块
const { regUser,login } = require('../router_handler/user')

// 注册新用户
router.post('/reguser', regUser)

// 登录
router.post('/login', login)

// 将路由对象共享出去
module.exports = router