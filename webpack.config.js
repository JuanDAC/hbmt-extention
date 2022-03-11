const { resolve } = require('path');

module.export = (env, args) => {
    const { mode } = args;
    const dev = mode.includes("development");

    console.log("env", env);
    return {
        devtool: "source-map",
        watch: true,
        debug: true,
        mode: 'production',
        target: ['web', 'es5'], // enum
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
        resolve: {
            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                    "@share": resolve(__dirname, 'src', 'share'),
                    "@routes": resolve(__dirname, 'src', 'routes'),
                }
            },
        },
        filename: '[name].[extension]',
        output: {
            path: resolve(__dirname, 'build')
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
        ]
    };
}
