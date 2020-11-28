const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['components/**/*.tsx', 'lib/**/*.tsx', 'pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    textColor: { ...colors, primary: '#c05621' },
    transitionDuration: {
      DEFAULT: '200ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    screens: {
      sm: '500px',
    },
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
