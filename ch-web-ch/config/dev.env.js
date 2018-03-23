var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:8880/api/admin/web"', // https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin 182.254.218.31
})
