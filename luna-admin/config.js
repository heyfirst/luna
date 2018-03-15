const commonConfig = {
  isProduction: false,
  apiPath: '_________________________',
  port: 3000,
  baseURL: 'http://localhost:3000'
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    apiPath: '_________________________',
    port: 19000,
    baseURL: 'http://localhost:19000'
  },
  production: {
    isProduction: true,
    apiPath: '_________________________',
    port: 20000,
    baseURL: 'http://localhost:20000'
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)
