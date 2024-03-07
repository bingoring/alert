module.exports = {
    "{product,module}/**/*.{ts,tsx}": (files) => {
        return `nx affected --target=typecheck --files=${files.join(",")}`;
    },
    "{product,module}/**/*.{js,ts,jsx,tsx,json}": [
        (files) => `nx affected:lint --fix=true --files=${files.join(",")}`,
    ],
};
