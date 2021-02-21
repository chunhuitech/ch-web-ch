var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8880/api/admin/web"', // http://www.firemail.wang:8880/api/admin/web  http://localhost:8880/api/admin/web
})
