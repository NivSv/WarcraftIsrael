const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        
        fontColor: {
            primary: "#FFFFFF",
        },
        fontFamily: {
            primary: ['Assistant', 'sans-serif'],
        },
        extend: {
            colors: {
                callToAction: '#6CFBCE',
                primary: {
                    700: '#F8F8FF', //Blue + white
                    800: '#8B8DB9', //Blue + grey
                    900: '#2B499F', //Dark blue
                },
            },
        },
    },
    plugins: [],
}
