const { resolve } = require('path');



module.export = (env, args) => {
    const { mode } = args;

    return {
        resolve: {
            extensions: ['js', 'mjs'],
            alias: {
                "@share": resolve(__dirname, 'src', 'share'),
                "@routes": resolve(__dirname, 'src', 'routes'),
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
        }
    };
}
