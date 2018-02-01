const commonConfig = {
  isProduction: false,
  port: 4000,
  baseURL: ''
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    port: 4001,
  },
  production: {
    isProduction: true,
    port: 4002
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)