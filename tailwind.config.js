/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fafb',
                    100: '#d9f1f4',
                    200: '#b8e4e9',
                    300: '#6dc5d1',
                    400: '#4fb2c1',
                    500: '#3396a7',
                    600: '#2d7a8d',
                    700: '#2a6474',
                    800: '#2a5360',
                    900: '#274652',
                    950: '#152d37',
                },
                secondary: {
                    50: '#fdf7ef',
                    100: '#faecda',
                    200: '#f5d5b3',
                    300: '#ecb176',
                    400: '#e69251',
                    500: '#e0762f',
                    600: '#d15e25',
                    700: '#ae4720',
                    800: '#8b3b21',
                    900: '#70321e',
                    950: '#3c170e',
                },
            },
        },
        plugins: [],
    }
}
