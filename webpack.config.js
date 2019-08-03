const path = require("path");

module.exports = {
    entry: "./src/js/hello.js",
    output: {
        filename: "sumi_verification_bundle.js",
        path: path.resolve("./dist/js")
    }
};