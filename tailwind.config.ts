import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#122117',
          moss: '#1d6a43',
          leaf: '#2f9b5f',
          sand: '#f2efe7',
          clay: '#c96f42',
        },
      },
      boxShadow: {
        card: '0 24px 60px rgba(18, 33, 23, 0.14)',
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0, transparent 28%), radial-gradient(circle at 80% 0%, rgba(201,111,66,0.18) 0, transparent 24%), linear-gradient(160deg, #f7f2e8 0%, #ebe4d5 100%)",
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
