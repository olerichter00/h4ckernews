const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['components/**/*.tsx', 'lib/**/*.tsx', 'pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.8rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
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
      spacing: {
        1: '0.162rem',
        2: '0.35rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
