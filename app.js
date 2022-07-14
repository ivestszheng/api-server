/*
 * @Descripttion: 
 * @Date: 2022-07-13 16:08:45
 * @LastEditTime: 2022-07-13 16:31:07
 */
const express = require('express');
const app = express()

const cors = require('cors');
app.use(cors())

// 配置解析表单数据的中间件；注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入并使用用户模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})
