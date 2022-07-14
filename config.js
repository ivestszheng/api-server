/*
 * @Descripttion: 全局的配置文件
 * @Date: 2022-07-14 14:32:26
 * @LastEditTime: 2022-07-14 14:32:27
 */
module.exports = {
    hostName: '127.0.0.1',
    port: 3007,
    // 加密和解密 Token 的密钥
    jwtSecretKey: 'ivestszheng',
    // token 的有效期
    expiresIn: '10h'
}