module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'black': '#000000',
      'black-transparent': '#00000030',
      'white': '#ffffff',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#06c706',
      'green-light': '#b8ffb8',
      'red': '#ff0000',
      'red-light':'#fbbdbd',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#9d9d9d',
      'soft-gray': '#f9f7f7',
      'gray-border': '#e3e3e3',
      'main': 'FF2B44',
      'sky-blue': '#2B99FF',
      'dark-blue': '#203060',
      'darkmode-black-01': '#121212',
      'darkmode-black-02': '#21262E',
      'darkmode-blue-01': '#3A9CFF',
    },
    fontFamily: {
      robot: ['"Roboto"', 'sans-serif']
    },
    extend: {
      keyframes: {
        'border-b': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1.3)' },
        }
      },
      animation: {
        'border-b': 'border-b .4s linear forwards',
      },
      flexGrow: {
        '1/2': 0.2
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}