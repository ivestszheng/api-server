/*
 * @Descripttion: 文章分类管理路由 
 * @Date: 2022-07-15 11:15:48
 * @LastEditTime: 2022-07-15 14:52:42
 */
const express = require('express')
const router = express.Router()
const {
    getArtCates,
    addArticalCates,
    deleteCateById,
    getArtCateById,
    updateCateById
} = require('../router_handler/artcate')

const expressjoi = require('@escook/express-joi')
const {
    add_cate_schema,
    delete_cate_schema,
    get_cate_schema,
    update_cate_schema
} = require('../schema/artcate')

// 获取文章那个分类列表数据的路由
router.get('/cates', getArtCates)

// 新增文章分类
router.post('/addcates', expressjoi(add_cate_schema), addArticalCates)

// 根据 id 删除文章分类的路由
router.get('/deletecate/:id', expressjoi(delete_cate_schema), deleteCateById)

// 根据 id 获取文章分类的路由
router.get('/cates/:id', expressjoi(get_cate_schema), getArtCateById)

// 根据 id 更新文章分类的路由
router.post('/updatecate',expressjoi(update_cate_schema),updateCateById)

module.exports = router