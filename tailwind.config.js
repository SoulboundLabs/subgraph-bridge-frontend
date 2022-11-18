module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#7EFEF6',
        yellow: '#fbf4a1',
        'blue-transparent': 'rgba(0, 248, 248, 0.1)',
        'blue-glass': 'rgba(0, 248, 248, 0.25)',
        'orange-transparent': 'rgba(255, 167, 108, 0.3)',
        orange: 'rgb(255, 167, 108)'
      }
    }
  },
  variants: {
    fill: ['hover', 'focus'] // this line does the trick
  },
  plugins: [
    // require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
  daisyui: {}
}
