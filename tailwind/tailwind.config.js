module.exports = {
  theme: {
    extend: {
      colors: {
        'gold': '#D2C19A',
        'light-gold': '#DACBB1',
      },
    },
    transitionProperty: {
      'transform': 'transform',
      'bg': 'background-color',
      'opacity': 'opacity',
    },
    transitionDuration: {
      'default': '250ms',
      '500': '500ms',
    },
    transitionTimingFunction: {
      'default': 'ease',
      'linear': 'linear',
    },
    willChange: {
      'auto': 'auto',
    },
    transform: {
      'none': 'none',
    },
    rotate: {
      '90': '90deg',
      '180': '180deg',
      '270': '270deg',
      '3d': ['0', '1', '0.5', '45deg'],
    },
    scale: {
      '98': '0.98',
    },
  },
  variants: {
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive'],
    rotate: ['responsive'],
    scale: ['responsive', 'hover'],
    transformStyle: ['responsive'],
    backfaceVisibility: ['responsive'],
  },
  plugins: [
    require('tailwindcss-transitions')(),
    require('tailwindcss-transforms')({
      '3d': true,
    }),
  ],
}
