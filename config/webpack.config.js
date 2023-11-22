const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = async (env, options) => {
    const isDevelopment = options.mode === "development";
    const config = {
        target: "node",
        // no source maps for production
        devtool: isDevelopment ? "inline-source-map" : undefined,
        devServer: {
            static: {
                directory: path.join(__dirname, "..", "dist"),
            },
        },
        entry: ["./src/index.ts"],
        output: {
            // Add contenthash to cache bust on CDN
            filename: "[name].js",
            path: path.resolve(__dirname, "..", "dist"),
        },
        resolve: {
            extensions: [".ts", ".json", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: "assets/resource",
                },
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        to: "robots.txt",
                        from: "./src/robots.txt",
                    },
                ],
            }),
        ],
    };

    return config;
};
