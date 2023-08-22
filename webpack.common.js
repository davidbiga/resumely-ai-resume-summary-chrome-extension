const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/contexts/popup/index.tsx"),
    eventPage: path.join(__dirname, "src/eventPage.ts"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-react']
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // Compiles Sass to CSS
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  stats: {
    errorDetails: true
  },
};
