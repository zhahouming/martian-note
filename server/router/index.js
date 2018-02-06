const path = require('path')
const express = require('express')
const router = express.Router()

const middleware = require('../middleware')
const handlers = require('../handlers')

router
     // sso不纳入鉴权
    .get('/martian-note/sso', handlers.sso)
    .get('/martian-note/logout', handlers.logout)

    .use('/martian-note', middleware.auth)
    .use('/martian-note', middleware.setPermissions)
    .use('/martian-note', middleware.checkPermission)

     // serve静态文件
    .use('/martian-note', express.static(path.resolve(__dirname, '../../client/dist')))
    .use('/martian-note/dist', express.static(path.resolve(__dirname, '../../client/dist')))
    .use('/martian-note/public', express.static(path.resolve(__dirname, '../../public')))

module.exports = router