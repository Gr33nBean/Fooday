/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ion-color-primary)',
        secondary: 'var(--ion-color-secondary)',
        tertiary: 'var(--ion-color-tertiary)',
        success: 'var(--ion-color-success)',
        warning: 'var(--ion-color-warning)',
        danger: 'var(--ion-color-danger)',
        dark: 'var(--ion-color-dark)',
        medium: 'var(--ion-color-medium)',
        light: 'var(--ion-color-light)',
        blue: '#1da1f2',
        black: '#14171A',
        'dark-gray': '#657786',
        'light-gray': '#AAB8C2',
        'extra-light-gray': '#E1E8ED',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
