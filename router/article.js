/*
 * @Descripttion: 文章路由模块
 * @Date: 2022-07-15 15:13:39
 * @LastEditTime: 2022-07-15 15:37:00
 */
const express = require('express');
const router = express.Router()

const { addArticle } = require('../router_handler/article')
const { add_article_schema } = require('../schema/article')
const expressjoi = require('@escook/express-joi')

// 发布文章的路由
router.post('/add', expressjoi(add_article_schema), addArticle)

module.exports = router