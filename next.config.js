const withPWA = require('next-pwa')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  publicRuntimeConfig: {
    GEOLOCATION_DB_URL: process.env.GEOLOCATION_DB_URL,
    VOICERSS_URL: process.env.VOICERSS_URL,
  },
  pwa: {
    dest: 'public',
  },
}

module.exports = isProduction ? withPWA(config) : config
