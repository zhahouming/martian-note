const config = require('../config')

exports = module.exports = function (req, res, next) {
    let user = req.signedCookies['user']
    if (user) {
        res.locals.userName = user
        res.cookie('user', user, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000), signed: true })
        next()
    } else {
        res.redirect(config.loginUrl.replace('{service}', 'zhazhiwen.cn'))
    } 
}