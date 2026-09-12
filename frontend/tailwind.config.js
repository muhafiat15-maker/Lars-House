/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lars-teal': '#003b49',
        'lars-navy': '#0a192f',
        'lars-sand': '#f4f1eb',
        'lars-gold': '#d4af37',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'fluid-h1': 'clamp(2rem, 4vw + 1rem, 3.5rem)',
        'fluid-h2': 'clamp(1.5rem, 2.5vw + 1rem, 2.25rem)',
        'fluid-h3': 'clamp(1.25rem, 1.5vw + 1rem, 1.75rem)',
        'fluid-p': 'clamp(0.875rem, 1vw + 0.5rem, 1rem)',
      }
    },
  },
  plugins: [],
}
