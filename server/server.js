const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const config = require('./config')
const tools = require('./common/tools')
const router = require('./router')
const db = require('./db')

const serverAddr = tools.getServerAddr() // 服务器IP
const privateKey  = fs.readFileSync(path.resolve(__dirname, '../credentials/server.key'), 'utf8') // 私钥
const certificate = fs.readFileSync(path.resolve(__dirname, '../credentials/server.pem'), 'utf8') // 证书
const credentials = { key: privateKey, cert: certificate }

app
  .use(compression())
  .use(bodyParser.json({limit: '5mb'})) // 设置请求体最大大小为5M
  .use(cookieParser('martian')) // 注册cookie处理模块,并使用签名
  .use('/', router) // 注册业务逻辑处理模块

// init Mongodb
db.mongo.init(app)

// 创建 http 、备用 http 、https 服务器
const httpServer = http.createServer(app)
const httpBackupServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

// 添加服务端口监听
tools.addServer(httpServer, config.port, serverAddr)
// tools.addServer(httpsServer, config.sslPort, serverAddr)
// tools.addServer(httpBackupServer, config.backupPort, serverAddr)