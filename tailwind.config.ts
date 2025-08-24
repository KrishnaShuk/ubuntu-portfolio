// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // These paths are crucial. They tell Tailwind where to look for class names.
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-accent': '#4b8501',
        'ubuntu-purple': '#5E2750',
        'ubuntu-warm-grey': '#AEA79F',
        'ubuntu-light-grey': '#F7F7F7',
        'top-bar': '#1E1B1B',
        'dock': 'rgba(44, 40, 40, 0.9)',
        'window-bg': '#363333',
        'window-header': '#2C2828',
        'text-light': '#F2F2F2',
        'text-dark': '#333333',
      },
    },
  },
  plugins: [],
}
export default config