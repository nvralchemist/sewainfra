import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sewain: {
          primary: '#1D9E75',
          'primary-light': '#E1F5EE',
          'primary-dark': '#0F6E56',
          amber: '#EF9F27',
          red: '#E24B4A',
          'text-primary': '#1a1a1a',
          'text-secondary': '#6b7280',
          border: '#e5e7eb',
          bg: '#f9fafb',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
