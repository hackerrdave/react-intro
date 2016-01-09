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
      plugins.push(new webpack.optimize.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
};

var getLoaders = function(env) {
  return [
    { 
      test:     /\.js$/, 
      include:  path.join(__dirname, 'src'), 
      loaders:  ['babel', 'eslint']
    },
    { 
      test:     /(\.css|\.scss)$/,
      include:  path.join(__dirname, 'src'),
      loaders:  ['style', 'css', 'sass'] 
    }
  ];
}

var getEntry = function(env) {
  var entry = [];

  if (env == 'development') { entry.push('webpack-hot-middleware/client'); }

  entry.push('./src/index');
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
