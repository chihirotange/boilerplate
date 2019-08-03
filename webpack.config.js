const path = require("path");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        // change this name V
        filename: "sumi_verification_bundle.js",
        path: path.resolve("./dist/js")
    }
};