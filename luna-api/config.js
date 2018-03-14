const commonConfig = {
  projectName: 'LUNA-API',
  isProduction: false,
  port: 3010,
  baseURL: ''
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    port: 3011
  },
  production: {
    isProduction: true,
    port: 3012
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)