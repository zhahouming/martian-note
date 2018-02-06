//
// 所有数据库操作全部封装在db模块内部完成，统一对外暴露接口调用
//
const mysql = require('./mysql')
const mongo = require('./mongo')

exports.mysql = mysql
exports.mongo = mongo