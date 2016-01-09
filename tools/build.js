var webpack               = require('webpack');
var webpackConfigBuilder  = require('../webpack.config');
var colors                = require('colors');
var args                  = require('yargs').argv;

process.env.NODE_ENV      = 'production';
var webpackConfig         = webpackConfigBuilder('production');

webpack(webpackConfig).run((err, stats) => {
  var inSilentMode = args.s; //set to true when -s is passed
  if (!inSilentMode) { console.log('Generating minified bundle for prod use via Webpack...'.bold.blue); }
  if (err) { console.log(error.bold.red); return 1; }

  var jsonStats = stats.toJson();
  if (jsonStats.hasErrors) { return jsonStats.errors.map(error => console.log(error.red)); }
  if (jsonStats.hasWarnings && !inSilentMode) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow);
  }

  if (!inSilentMode) { console.log('Webpack stats: ', stats.toString()); }

  console.log('Your app has compiled in production mode and written to /dist. Woot!'.green.bold);
  return 0;
});

