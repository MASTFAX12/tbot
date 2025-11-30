/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2AABEE', // Telegram Blue
                secondary: '#229ED9',
                dark: '#17212B',
                darker: '#0E1621',
                surface: '#242F3D',
            }
        },
    },
    plugins: [],
}
