
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , helloworld = require('./routes/helloworld')

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '130.65.159.143:9200',
  log: 'trace'
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

//__dirname is the name of the directory that the currently executing script resides in.
app.set('views', __dirname + '/views');

//Setting View Engine
app.set('view engine', 'ejs');

//add middleware
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.favicon());


//app.use(express.logger('dev'));

//parse json
app.use(express.bodyParser());

//app.use(express.methodOverride());

var msg =client.search({
  index: 'stock',
  id:'AV4had8f9rCScptkdesE',
  body: {
    query: {
      match: {
        body: ''
      }
    }
  }
}).then(function (resp) {
  var hits = resp.hits.hits;
}, function (err) {
  console.trace(err.message);
});
console.log("Here it is "+msg)

// var msg= client.search({
//   q:'*'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//  // console.trace(error.message);
// });

//console.log("Here it is"+msg);
//sets router folder
app.use(app.router);

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
http://localhost:3000/stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));

// development only // default error handler
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/helloworld', helloworld.getHelloWorld);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
