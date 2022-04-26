//main JS starts API
const express = require("express");
var https = require('https');
var fs = require('fs');
const app = express();

const httpPort = process.env.PORT || 4000;
const httpsPort = process.env.HTTPS_PORT || 4443;

app.use(express.static('public'));

app.listen(httpPort, function (){
    console.log('Server started at http://localhost:%s', httpPort);
});

console.log("DIR: "+__dirname);

https
  .createServer(
    {
        key: fs.readFileSync(__dirname + '/key.pem'),
        cert: fs.readFileSync(__dirname + '/cert.pem'),
    },
    app
  )
  .listen(httpsPort, () => {
    console.log('Server started at http://localhost:%s', httpsPort);
  });
