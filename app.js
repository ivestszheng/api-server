// @ts-nocheck
/*
 * @Descripttion: 入口文件
 * @Date: 2022-07-13 16:08:45
 * @LastEditTime: 2022-07-14 15:17:00
 */
const express = require('express');
const app = express()
const joi = require('joi')
const { port, hostName } = require('./config')

const cors = require('cors');
app.use(cors())

// 配置解析表单数据的中间件；注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            // 检测是不是 Error 对象的实例，如果不是则直接返回 err 字符串
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

// Token 解析成功，express-jwt 中间件会帮 req 挂载上 user 对象
app.use(expressJWT({secret: config.jwtSecretKey})
    .unless({path: [/^\/api/]}))

// 导入并使用用户模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo.js')
app.use('/my',userinfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

app.listen(port, () => {
    console.log(`api server running at http://${hostName}:${port}`);
})
