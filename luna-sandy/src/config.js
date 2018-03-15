const commonConfig = {
  projectName: 'LUNA-JAVA-JUDGER',
  isProduction: false,
  port: 3020,
  baseURL: ''
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
    port: 3021
  },
  production: {
    isProduction: true,
    port: 3022
  }
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
)
