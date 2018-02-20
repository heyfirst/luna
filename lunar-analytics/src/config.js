const commonConfig = {
  projectName: 'LUNAR-ANALYTICS',
  isProduction: false,
  port: 3030,
  baseURL: ''
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    port: 3031
  },
  production: {
    isProduction: true,
    port: 3032
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)
