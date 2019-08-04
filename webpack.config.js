const path = require("path");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        // change this name V
        filename: "scripts_bundle.js",
        path: path.resolve("./dist/js")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules",
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};