const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = options => {
  return {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      publicPath: "auto",
      uniqueName: "mfe4"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "react",
        library: { type: "var", name: "react" },
        filename: "remoteEntry.js", // <-- Meta Data
        exposes: {
          './web-components': './src/app.tsx',
        },
        shared: ["react", "react-dom"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/*.html'
          }
        ]
      })
    ],
    devServer: {
      port: 4204
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
  }
}
