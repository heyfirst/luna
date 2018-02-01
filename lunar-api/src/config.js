const commonConfig = {
  isProduction: false,
  port: 3000,
  baseURL: ''
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    port: 3001,
  },
  production: {
    isProduction: true,
    port: 3002
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)