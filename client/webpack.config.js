var ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const plugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"'
});

module.exports = {
  entry: getEntrySources([ './src/entry.js' ]),
  output: {
    // publicPath: 'http://localhost:8080/',
    filename: 'build/bundle.js'
  },
  plugins: [ plugin,
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        // "?-autoprefixer" disables autoprefixer in css-loader itself:
        // https://github.com/webpack/css-loader/issues/281
        // We already have it thanks to postcss. We only pass this flag in
        // production because "css" loader only enables autoprefixer-powered
        // removal of unnecessary prefixes when Uglify plugin is enabled.
        // Webpack 1.x uses Uglify plugin as a signal to minify *all* the assets
        // including CSS. This is confusing and will be removed in Webpack 2:
        // https://github.com/webpack/webpack/issues/283
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          // 'react-hot',
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015,presets[]=react-boilerplate'
        ]
      }
    ]
  }
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    // sources.push('webpack-dev-server/client?http://localhost:8080');
    // sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}
