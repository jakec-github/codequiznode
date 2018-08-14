const path = require('path')

module.exports = {
  // Currently using hot-middleware to reload page but it is possible to
  // get this working such that front end updates without loss of state
  // Also doesn't work with nodemon
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
}
