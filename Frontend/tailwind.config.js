/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}", // indica onde Tailwind deve buscar classes CSS
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6d28d9',
        secondary: '#10b981',
        dark: '#1f2937',
        light: '#f3f4f6',
        lightGray:'#37404d',
        sidebar: '#2d1b4d'
      },
      background:{
        primary: '#6d28d9',
        secondary: '#10b981',
        dark: '#1f2937',
        light: '#f3f4f6',
        lightGray:'#37404d',
        sidebar: '#2d1b4d'
      },
      zIndex:{
        '100':100,
        '200':200,
        '300':300,
        '400':400,
        '500':500,
        '600':600,
        '700':700,
        '800':800,
        '900':900,
        '1000':1000,
        'auto': 'auto',
      },
      boxShadow: {
        'default': '0 0 1px rgba(0, 0, 0, 0.05)',
        'hover': '1px 4px 15px #fff;',
      }
    },
  },
  plugins: [],
};
