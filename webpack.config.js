const path = require(`path`);

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(jpg|png|gif|woff|eot|ttf|svg)/,
        use: {
          loader: 'url-loader', // this need file-loader
          options: {
            limit: 50000
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      hooks: path.resolve(__dirname, `src`,`hooks`)
    }
  },
  devtool: 'source-map',
};


