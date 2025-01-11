/** @type {import('@ladle/react').UserConfig} */
export default {
    appendToHead: 
        '<link rel="stylesheet" type="text/css"' 
        + 'href="https://fonts.googleapis.com/css2?'
        + 'family=Asap:ital,wdth,wght@0,75..125,100..900;1,75..125,100..900'
        + '&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700'
        + '&display=swap">',
    addons: {
        a11y: {
            enabled: true,
        },
        theme: {
            enabled: true,
            defaultState: "dark",
        },
    },
};