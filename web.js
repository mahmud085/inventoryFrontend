var gzippo = require('gzippo');
  var express = require('express');
  var app = express();
  var logger = require("morgan");
 var cors = require('express-cors')
app.use(logger("dev"));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));


app.use(cors({
    allowedOrigins: [
        'herokuapp.com'
    ]
}))

app.listen(process.env.PORT || 9000,function(){
	console.log("Server Listening at ",this.address().port);
});
