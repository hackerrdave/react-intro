var webpack = require('webpack');
var path    = require('path');

var getPlugins = function(env) {
  var plugins = [new webpack.optimize.OccurenceOrderPlugin()];

  switch(env) {
    case 'production':
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}));
      break;
    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
};

var getLoaders = function(env) {
  return [
    { 
      test:     /\.js$/, 
      exclude: '/node_modules/',
      loader:  'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    { 
      test:     /\.js$/, 
      include:  path.join(__dirname, 'public'), 
      loader:  'eslint',
    },
    { 
      test:     /(\.css|\.scss)$/,
      include:  path.join(__dirname, 'public'),
      loaders:  ['style', 'css', 'sass'] 
    }
  ];
}

var getEntry = function(env) {
  var entry = [];

  if (env == 'development') { entry.push('webpack-hot-middleware/client'); }

  entry.push('./public/index');
  return entry;
}

module.exports = function getConfig(env) {
  return {
    debug: true,
    devTool: env == 'production' ? 'source-map' : 'eval-source-map',
    noInfo: true,
    entry: getEntry(env),
    target: env == 'test' ? 'node' : 'web',
    output: {
      path: __dirname + '/dist/js',
      publicPath: '/js/',
      filename: 'bundle.js',
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env)
    }
  };
}
