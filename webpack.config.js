const { resolve } = require('path');



module.export = (env, args) => {
    const { mode } = args;

    return {
        filename: '[name].[extension]',
        output: {
            path: resolve(_dirname, 'build')
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
