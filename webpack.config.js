const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, args) => {
    const { mode } = args;
    const dev = mode.includes("development");
    const filename = 'index';
    const domine = 'https://intranet.hbtn.io';
    const fileManifest = './manifest.json';
    const encoding = 'utf8';

    if (mode === "production") {
        const data = readFileSync(fileManifest, encoding);
        const json = JSON.parse(data, { encoding });
        const newVersion = (parseFloat(json.version) + 0.001).toFixed(3);
        json.version = newVersion;
        writeFileSync(fileManifest, JSON.stringify(json, null, '\t'));
    }

    const data = readFileSync(fileManifest, encoding);
    const { version } = JSON.parse(data, { encoding });

    return {
        devtool: dev ? "hidden-source-map" : undefined,
        mode: 'production',
        target: ['web', 'es5'],
        stats: {
            env: true,
            outputPath: true,
            publicPath: true,
            assets: true,
            entrypoints: true,
            chunkGroups: true,
            chunks: true,
            modules: true,
            children: true,
            logging: true,
            loggingDebug: /webpack/,
            loggingTrace: true,
            warnings: true,
            errors: true,
            errorDetails: true,
            errorStack: true,
            moduleTrace: true,
            builtAt: true,
            errorsCount: true,
            warningsCount: true,
            timings: true,
            version: true,
            hash: true,
            colors: true,
            reasons: true
        },
        entry: ['babel-polyfill', `./src/${filename}.js`],
        output: {
            filename: `${filename}.js`,
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            alias: {
                "@share": resolve(__dirname, 'src', 'share'),
                "@routes": resolve(__dirname, 'src', 'routes'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                DOMINE: JSON.stringify(domine),
                VERSION: JSON.stringify(version),
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "manifest.json",
                        transform(content) {
                            const textFile = content.toString()
                                .replaceAll(/\[filename\]/g, filename)
                                .replaceAll(/\[domine\]/g, domine);

                            return (Buffer.from(textFile));
                        },
                    },
                    {
                        from: "icons/*",
                    }
                ],
            }),
        ],
    };
}
