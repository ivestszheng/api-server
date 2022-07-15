/*
 * @Descripttion: 
 * @Date: 2022-07-15 13:32:27
 * @LastEditTime: 2022-07-15 14:51:47
 */
const joi = require('joi')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_cate_schema = {
    params: {
        id
    }
}

exports.get_cate_schema = {
    params:{
        id
    }
}

exports.update_cate_schema = {
    body:{
        id,
        name,
        alias
    }
}