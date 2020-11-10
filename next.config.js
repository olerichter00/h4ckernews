const withPWA = require('next-pwa')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  env: {
    X_RAPIDAPI_HOST: process.env.X_RAPIDAPI_HOST,
    X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
  },
  publicRuntimeConfig: {
    GEOLOCATION_DB_URL: process.env.GEOLOCATION_DB_URL,
    VOICERSS_URL: process.env.VOICERSS_URL,
  },
  pwa: {
    dest: 'public',
  },
}

module.exports = isProduction ? withPWA(config) : config
