const os = require('os')

const config = require('../config')
const cookieKey = config.cookieKey
const networkInterfaces = os.networkInterfaces()
const serverNetwork = _.chain(networkInterfaces).values().flatten().find(function (item) {
  return false == item.internal && /ipv4/i.test(item.family)
}).value() || {}

exports.getUA = function (u) {
  if (u.indexOf('Trident') > -1) return 'trident'
  if (u.indexOf('Presto') > -1) return 'presto'
  if (u.indexOf('AppleWebKit') > -1) return 'webKit'
  if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) return 'gecko'
  if (!!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/)) return 'mobile'
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return 'ios'
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) return 'android'
  if (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1) return 'iPhone'
  if (u.indexOf('iPad') > -1) return 'iPad'
  if (u.indexOf('Safari') == -1) return 'webApp'
}

exports.addServer = function (server, port, serverAddr) {
  server.on('error', function (err) {
    console.error('%s', err)
  })
  server.on('listening', function () {
    console.log('listening on %s:%d', serverAddr, port)
  })
  server.listen(port)
}

exports.setCookie = function (res, cookie) {
  cookie = cookie
  res.cookie(cookieKey, cookie, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    domain: 'zhazhiwen.cn'
  })
}

exports.getServerAddr = function () {
  return serverNetwork.address
}