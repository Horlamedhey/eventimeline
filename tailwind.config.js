/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    screens: {
      sm: { min: '600px' },
      md: { min: '960px' },
      lg: { min: '1264px' },
      xl: { min: '1904px' },
    },
    fill: (theme) => ({
      secondary: theme('colors.secondary'),
      accent: theme('colors.accent'),
      accent2: theme('colors.accent2'),
    }),
    extend: {
      fontSize: {
        xxs: '.625rem',
        tinier: '.813rem',
        '1xl': '1.375rem',
        '2-5xl': '1.75rem',
        '3-5xl': '2rem',
        '4-5xl': '2.5rem',
      },
      colors: {
        primary: { default: '#4d31bf', light: '#6B4FDD', lighter: '#715ACC' },
        secondary: { default: '#ffc510', dark: '#FFC100' },
        black: {
          default: '#000000',
          '100': 'rgba(0, 0, 0, 0.1)',
          '200': 'rgba(0, 0, 0, 0.2)',
          '300': 'rgba(0, 0, 0, 0.3)',
          '400': 'rgba(0, 0, 0, 0.4)',
          '500': 'rgba(0, 0, 0, 0.5)',
          '600': 'rgba(0, 0, 0, 0.6)',
          '700': 'rgba(0, 0, 0, 0.7)',
          '800': 'rgba(0, 0, 0, 0.8)',
          '900': 'rgba(0, 0, 0, 0.9)',
        },
        'black-variant': {
          default: '#121212',
          '100': 'rgba(18, 18, 18, 0.1)',
          '200': 'rgba(18, 18, 18, 0.2)',
          '300': 'rgba(18, 18, 18, 0.3)',
          '400': 'rgba(18, 18, 18, 0.4)',
          '500': 'rgba(18, 18, 18, 0.5)',
          '600': 'rgba(18, 18, 18, 0.6)',
          '700': 'rgba(18, 18, 18, 0.7)',
          '800': 'rgba(18, 18, 18, 0.8)',
          '900': 'rgba(18, 18, 18, 0.9)',
        },
        accent: { default: '#ea218d', light: '#FB0977' },
        accent2: '#5ee2b3',
        error: '#ff5252',
        info: '#2196f3',
        success: '#4caf50',
        'success-variant': '#5EE2B3',
        warning: '#ffc107',
        'gray-variant': '#c4c4c4',
        'gray-variant1': '#f0f0f0',
        'gray-variant2': '#b5b5b5',
        'gray-variant3': '#8b8b8b',
        'gray-variant4': '#f4f4f4',
        // ...
      },
      fontFamily: {
        inter: ['Inter'],
        quicksand: ['Quicksand'],
        josefinsans: ['JosefinSans'],
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        xl: '1rem',
      },
      height: {
        '70': '20rem',
      },
      width: {
        '1-5/12': '12.5%',
        '2-5/12': '20.835%',
        '7-5/12': '61%',
        '9-5/12': '79.165%',
      },
      inset: {
        '0-5/12': '4.165%',
        '1-5/12': '12.5%',
        // '2-5/12': '20.835%',
        // '7-5/12': '61%',
        // '9-5/12': '79.165%',
      },
      boxShadow: {
        outline: '0 0 0 0.5px rgba(0, 0, 0, 0.2)',
      },
      translate: {
        '10/12': '83.333333%',
        '5/12': '41.666667%',
      },
    },
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    padding: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
