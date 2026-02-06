/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#c6ff00',
                    light: '#d4ff33',
                    dark: '#a3d100',
                },
                secondary: '#000000',
                zinc: {
                    850: '#1e1e24',
                    950: '#09090b',
                },
                glass: 'rgba(255, 255, 255, 0.03)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'mesh': 'radial-gradient(at 0% 0%, rgba(198, 255, 0, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(198, 255, 0, 0.05) 0, transparent 50%)',
            }
        },
    },
    plugins: [],
}
