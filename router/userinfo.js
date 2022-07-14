/*
 * @Descripttion: 
 * @Date: 2022-07-14 15:11:32
 * @LastEditTime: 2022-07-14 15:24:36
 */
const express = require('express');
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户基本信息的路由
router.get('/userinfo',userinfo_handler)

module.exports = router