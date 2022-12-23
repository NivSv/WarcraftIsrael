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
        extend: {
            colors: {
                primary: {
                    700: "202020",
                    800: '#1a1a1a',
                    900: '#121212',
                }
            }
        },
    },
    plugins: [],
}
