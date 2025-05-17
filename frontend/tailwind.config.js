// frontend/tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',         // for app directory
    './components/**/*.{js,ts,jsx,tsx}',  // for shared components
    './pages/**/*.{js,ts,jsx,tsx}',       // if you still have a pages/ folder
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1E40AF',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
