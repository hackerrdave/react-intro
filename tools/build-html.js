//Copy index.html to dist/ and prepend optional jsTrack code
var fs            = require('fs');
var colors        = require('colors');
var cheerio       = require('cheerio');
var useTrackJs    = true;
var trackJsToken  = '';
var trackJsCode   = '';

fs.readFile('public/index.html', 'utf8', function(err, data) {
  if (err) { return console.log(err.bold.red); }
  if (useTrackJs) { trackJsCode = ''; } 

  var $ = cheerio.load(data);
  $('head').prepend(trackJsCode);

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if (err) { return console.log(err.red); }
  });

  console.log('index.html written to /dist'.green);
}

