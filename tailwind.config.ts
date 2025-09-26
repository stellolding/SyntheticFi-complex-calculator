import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: { extend: { colors: { primary: { dark: '#00233A', DEFAULT: '#0392F1', light: '#C2DFF6' }, secondary: { dark: '#443642', DEFAULT: '#4E0BD4', light: '#EAE4EC' }, tertiary: '#E8DCCE' } } },
  plugins: [],
} satisfies Config
