const { composePlugins, withNx } = require("@nrwl/webpack");
const webpackDefaultConfig = require("../../webpack.config");

const { existsSync } = require("fs");
const { resolve } = require("path");
const entry = (() => {
    for (const mainFile of ["./src/main.ts"]) {
        if (existsSync(mainFile)) {
            return mainFile;
        }
    }
})();

module.exports = composePlugins(withNx(), (config) => {
    return {
        output: {
            filename: "[name].js",
            path: resolve("./webpack"),
        },
        entry,
        ...config,
        ...webpackDefaultConfig,
    };
});
