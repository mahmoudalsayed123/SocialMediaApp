/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        // If you're using app directory:
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // primary: '#1e40af',    // Custom blue
                // secondary: '#facc15',  // Custom yellow
                // accent: '#10b981',     // Custom green
                // brand: {
                //     light: '#a5b4fc',
                //     DEFAULT: '#6366f1',
                //     dark: '#4338ca',
                // },
            },
        },
    },
    plugins: [],
}
