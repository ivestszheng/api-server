/*
 * @Descripttion: 处理函数 - 文章分类
 * @Date: 2022-07-15 11:25:58
 * @LastEditTime: 2022-07-15 15:27:51
 */
const db = require('../db/index')

exports.getArtCates = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate where is_delete=0 ORDER BY id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        return res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results
        })
    })
}

exports.addArticalCates = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = 'SELECT * FROM ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')

        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('分类名称与分类别名被占用，请更换后重试！')
        }
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 分类名称和分类别名都可用，执行添加的动作
        const insertSql = 'INSERT INTO ev_article_cate set ?'
        db.query(insertSql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            return res.cc('新增文章分类成功！', 0)
        })
    });
}

exports.deleteCateById = (req, res) => {
    const sql = 'UPDATE ev_article_cate SET is_delete=1 WHERE id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        return res.cc('删除文章分类成功！', 0)
    })
}

exports.getArtCateById = (req, res) => {
    const sql = 'SELECT * from ev_article_cate WHERE id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        return res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}

exports.updateCateById = (req, res) => {
    // 查重
    const sql = 'SELECT * from ev_article_cate WHERE id<>? AND (name=? or alias=?)'
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if(results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias){
            return res.cc('分类名称与别名被占用，请更换后重试！')
        }
        if(results.length === 1 && results[0].name === req.body.name){
            return res.cc('分类名称被占用，请更换后重试！')
        }
        if(results.length === 1 && results[0].alias === req.body.alias){
            return res.cc('分类别名被占用，请更换后重试')
        }

        const updateSql = 'UPDATE ev_article_cate set ? WHERE id=?'
        db.query(updateSql,[req.body,req.body.id],(err, results)=>{
            if (err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新文章分类失败！')

            res.cc('更新文章分类成功',0)
        })
    })
}