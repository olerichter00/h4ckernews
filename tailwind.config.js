const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['components/**/*.tsx', 'lib/**/*.tsx', 'pages/**/*.tsx'],
  theme: {
    colors: { ...colors, primary: colors.orange },
    screens: {
      sm: '500px',
    },
  },
  variants: {},
  plugins: [],
}
