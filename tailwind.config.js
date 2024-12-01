import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        geist: ["Geist"],
      },
      colors: {
        'beyours': {
          100: '#c4c4c5',
          150: '#b4b4b5',
          200: '#a4a4a5',
          250: '#949495',
          300: '#848485',
          350: '#747475',
          400: '#646465',
          450: '#545455',
          500: '#444445',
          550: '#343435',
          600: '#242425',
          650: '#141415',
          700: '#121212',
          750: '#0D0D0D',
          800: '#7a1cac',
          900: '#ad49e1',
          1000: '#7a1cac50',
          1100: '#ad49e150',
        }
      },
    },
  },

  plugins: [forms],
};
